import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { getReceivedTransactions, submitTransaction, validateTransaction } from '../services/partnerAccountService'
import { formatCurrency } from '../utils/format'

export default function PartnerTransactionsPage() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [reference, setReference] = useState('')
    const [preview, setPreview] = useState(null)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const video = useRef(null)
    const stream = useRef(null)
    const timer = useRef(null)
    const alive = useRef(true)
    const [scanning, setScanning] = useState(false)

    function stopCamera() {
        clearTimeout(timer.current)
        stream.current?.getTracks().forEach(track => track.stop())
        stream.current = null
    }
    async function refresh() {
        try { setTransactions(await getReceivedTransactions()) }
        catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }
    useEffect(() => {
        alive.current = true
        refresh()
        return () => { alive.current = false; stopCamera() }
    }, [])

    async function scan() {
        setError('')
        if (!navigator.mediaDevices?.getUserMedia || !window.BarcodeDetector) {
            setError('La lecture caméra n’est pas disponible dans ce navigateur. Copiez le code de paiement du salarié dans le champ ci-dessous.')
            return
        }
        try {
            const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            if (!alive.current) { media.getTracks().forEach(track => track.stop()); return }
            stream.current = media
            setScanning(true)
            video.current.srcObject = media
            await video.current.play()
            const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
            async function detect() {
                if (!stream.current) return
                try {
                    const codes = await detector.detect(video.current)
                    if (codes[0]) {
                        setReference(codes[0].rawValue)
                        setPreview(null)
                        stopCamera()
                        setScanning(false)
                        return
                    }
                    timer.current = setTimeout(detect, 250)
                } catch { stopCamera(); setScanning(false); setError('Lecture impossible. Utilisez la saisie manuelle.') }
            }
            detect()
        } catch { stopCamera(); setScanning(false); setError('Caméra inaccessible. Autorisez son accès ou utilisez la saisie manuelle.') }
    }
    async function inspect(event) {
        event.preventDefault()
        setBusy(true); setError(''); setNotice(''); setPreview(null)
        try { setPreview(await submitTransaction({ reference })) }
        catch (err) { setError(err.message) }
        finally { setBusy(false) }
    }
    async function pay() {
        if (!preview || busy) return
        setBusy(true); setError('')
        try {
            const txn = await validateTransaction(preview.reference)
            setTransactions(list => [txn, ...list])
            setNotice('Paiement validé. Le compte salarié a été débité et le QR ne peut plus être utilisé.')
            setPreview(null); setReference('')
        } catch (err) { setError(err.message); setPreview(null) }
        finally { setBusy(false) }
    }
    return <>
        <PageHeader title="Transactions reçues" />
        {error && <p className="panel field-error" role="alert">{error} <button onClick={refresh}>Réessayer le chargement</button></p>}
        {notice && <p className="panel" role="status">{notice}</p>}
        <form className="panel form-panel" onSubmit={inspect}>
            <h2>Encaisser un paiement</h2>
            <p>Scannez le QR ou collez le code signé fourni par le salarié. Le montant sera vérifié par le serveur.</p>
            <button className="link-btn" type="button" disabled={busy || scanning} onClick={scan}>Scanner avec la caméra</button>
            <video ref={video} hidden={!scanning} muted playsInline style={{ width: '100%', maxWidth: 480 }} />
            {scanning && <button type="button" onClick={() => { stopCamera(); setScanning(false) }}>Arrêter la caméra</button>}
            <label htmlFor="payment-reference">Code de paiement</label>
            <textarea id="payment-reference" required value={reference} onChange={event => { setReference(event.target.value); setPreview(null) }} rows={4} style={{ width: '100%', overflowWrap: 'anywhere' }} />
            <button className="primary-btn" disabled={busy || !reference.trim()}>Vérifier le paiement</button>
        </form>
        {preview && <section className="panel">
            <h2>Confirmer {formatCurrency(preview.amount)}</h2>
            <p>{preview.label} — valable jusqu’à {new Date(preview.expiresAt).toLocaleTimeString('fr-FR')}</p>
            <p>La validation débite le salarié et est définitive.</p>
            <button className="primary-btn" disabled={busy} onClick={pay}>{busy ? 'Validation…' : 'Valider définitivement'}</button>
        </section>}
        <section className="panel">
            <h2>Historique des encaissements</h2>
            {loading ? <p>Chargement…</p> : !transactions.length ? <p>Aucun paiement reçu.</p> : transactions.map(txn => <div className="activity-row" key={txn.id}>
                <div>{txn.employee}<br />{txn.date} à {txn.time}</div>
                <strong>{formatCurrency(txn.amount)} — {txn.status}</strong>
            </div>)}
        </section>
    </>
}
