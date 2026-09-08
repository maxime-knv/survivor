-- Les paiements validés et leur journal ne peuvent être modifiés ou supprimés.
CREATE OR REPLACE FUNCTION cartepro_immutable_payment() RETURNS trigger AS $$
BEGIN
  IF TG_TABLE_NAME = 'PaymentAudit' OR (OLD."qrCodeId" IS NOT NULL AND OLD.status = 'SUCCESS') THEN
    RAISE EXCEPTION 'Validated payments and audit entries are immutable';
  END IF;
  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS cartepro_payment_immutable ON "Transaction";
CREATE TRIGGER cartepro_payment_immutable BEFORE UPDATE OR DELETE ON "Transaction"
FOR EACH ROW EXECUTE FUNCTION cartepro_immutable_payment();
DROP TRIGGER IF EXISTS cartepro_audit_immutable ON "PaymentAudit";
CREATE TRIGGER cartepro_audit_immutable BEFORE UPDATE OR DELETE ON "PaymentAudit"
FOR EACH ROW EXECUTE FUNCTION cartepro_immutable_payment();
