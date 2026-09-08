import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { spawnSync } from 'node:child_process'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

dotenv.config({ quiet: true })
const originalUrl = process.env.DATABASE_URL
const schema = 'cartepro_test_' + crypto.randomBytes(8).toString('hex')
const url = new URL(originalUrl)
url.searchParams.set('schema', schema)
const adminDb = new PrismaClient({ datasourceUrl: originalUrl })
let server, prisma
try {
  await adminDb.$executeRawUnsafe(`CREATE SCHEMA "${schema}"`)
  process.env.DATABASE_URL = url.toString()
  process.env.SESSION_SECRET = crypto.randomBytes(48).toString('hex')
  for (const args of [['db', 'push', '--skip-generate'], ['db', 'execute', '--schema', 'prisma/schema.prisma', '--file', 'prisma/integrity.sql']]) {
    const result = spawnSync('./node_modules/.bin/prisma', args, { env: process.env, encoding: 'utf8' })
    if (result.status) throw new Error('Initialisation de la base de test impossible: ' + result.stderr)
  }
  const app = (await import('../src/app.js')).default
  prisma = (await import('../src/lib/prisma.js')).prisma
  const bcrypt = (await import('bcryptjs')).default
  const password = 'Integration123!'
  const hash = await bcrypt.hash(password, 10)
  await prisma.partnerCategory.create({ data: { id: 'test', label: 'Test' } })
  const employee = await prisma.user.create({ data: { email: 'employee@test.invalid', password: hash, role: 'EMPLOYEE', balance: 100, status: 'ACTIVE' } })
  await prisma.user.create({ data: { email: 'admin@test.invalid', password: hash, role: 'ADMIN', status: 'ACTIVE' } })
  server = app.listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  const base = 'http://127.0.0.1:' + server.address().port + '/api/v1'
  async function api(path, method = 'GET', body, cookie) {
    const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) })
    return { status: response.status, cookie: response.headers.get('set-cookie')?.split(';')[0], body: response.status === 204 ? null : await response.json() }
  }
  const login = async email => api('/auth/login', 'POST', { email, password })
  assert.equal((await api('/partners')).status, 200)
  assert.equal((await api('/account')).status, 401)
  assert.equal((await api('/account', 'GET', undefined, 'cartepro_session=forged')).status, 401)
  const employeeLogin = await login('employee@test.invalid'), admin = await login('admin@test.invalid')
  assert.equal(employeeLogin.status, 200); assert.equal(admin.status, 200)
  assert.equal((await api('/auth/session', 'GET', undefined, admin.cookie)).body.role, 'ADMIN')
  assert.equal((await api('/users/employees', 'GET', undefined, employeeLogin.cookie)).status, 403)
  assert.equal((await api('/users/employees', 'GET', undefined, admin.cookie)).status, 200)
  assert.equal((await api('/users', 'POST', { email: 'evil@test.invalid', password, firstName: 'A', lastName: 'B', company: 'C', role: 'ADMIN' })).status, 403)
  const application = await api('/partner-applications', 'POST', { companyName: 'Test shop', siret: '12345678901234', objetSocial: 'Test', categoryId: 'test', city: 'Paris', phone: '0100000000', email: 'partner@test.invalid', password })
  assert.equal(application.status, 201)
  assert.equal((await login('partner@test.invalid')).status, 403)
  assert.equal((await api('/partner-applications/' + application.body.id, 'PATCH', { status: 'APPROVED', motif: 'test' }, admin.cookie)).status, 200)
  const partner = await login('partner@test.invalid')
  assert.equal(partner.status, 200)
  assert.equal((await api('/partner/account', 'GET', undefined, partner.cookie)).status, 200)
  const createQr = async amount => {
    const result = await api('/qr-codes', 'POST', { amount, label: 'Test' }, employeeLogin.cookie)
    assert.equal(result.status, 201, JSON.stringify(result.body)); return result.body
  }
  const qr = await createQr(12.5)
  const validate = token => api('/partner/validate', 'POST', { reference: token }, partner.cookie)
  assert.equal((await validate(qr.token + 'bad')).status, 400)
  assert.equal((await api('/partner/validate', 'POST', { reference: qr.token }, employeeLogin.cookie)).status, 403)
  const results = await Promise.all([validate(qr.token), validate(qr.token)])
  assert.deepEqual(results.map(r => r.status).sort(), [201, 409])
  assert.equal(Number((await api('/account', 'GET', undefined, employeeLogin.cookie)).body.balance), 87.5)
  assert.equal(await prisma.transaction.count(), 1)
  assert.equal(await prisma.paymentAudit.count(), 1)
  assert.equal((await api('/qr-codes/' + qr.id, 'GET', undefined, employeeLogin.cookie)).body.status, 'USED')
  const txn = await prisma.transaction.findFirst()
  await assert.rejects(prisma.transaction.update({ where: { id: txn.id }, data: { amount: -1 } }))
  await assert.rejects(prisma.transaction.delete({ where: { id: txn.id } }))
  const insufficient = await createQr(80)
  await prisma.user.update({ where: { id: employee.id }, data: { balance: 1 } })
  assert.equal((await validate(insufficient.token)).status, 409)
  assert.equal((await prisma.qrCode.findUnique({ where: { id: insufficient.id } })).status, 'ACTIVE')
  const expired = await prisma.qrCode.create({ data: { id: crypto.randomUUID(), code: crypto.randomUUID(), userId: employee.id, amount: 1, expiresAt: new Date(Date.now() - 1000) } })
  const { paymentToken } = await import('../src/lib/payment.js')
  assert.equal((await validate(paymentToken(expired))).status, 410)
  const cancel = await createQr(1)
  assert.equal((await api('/qr-codes/' + cancel.id, 'DELETE', undefined, employeeLogin.cookie)).status, 204)
  assert.equal((await validate(cancel.token)).status, 409)
  assert.equal((await api('/auth/logout', 'POST', {}, employeeLogin.cookie)).status, 204)
  assert.equal((await api('/account', 'GET', undefined, employeeLogin.cookie)).status, 401)
  if (process.env.BROWSER_TEST === '1') {
    // Endpoint de connexion réservé à ce serveur de test isolé, jamais exporté.
    app.get('/test-login', async (req, res) => {
      const user = await prisma.user.findUnique({ where: { email: req.query.email } })
      const { createSessionToken, verifySessionToken, setSessionCookie } = await import('../src/lib/session.js')
      const token = createSessionToken(user), payload = verifySessionToken(token)
      await prisma.session.create({ data: { id: payload.sid, userId: user.id, expiresAt: new Date(payload.exp * 1000) } })
      setSessionCookie(res, token)
      res.redirect(req.query.page)
    })
    app.use(express.static(path.resolve('../dist')))
    app.get(/.*/, (req, res) => res.sendFile(path.resolve('../dist/index.html')))
    const routes = [
      ['employee', '/accueil', 'Solde'], ['employee', '/historique', 'Historique des transactions'],
      ['employee', '/qr-code', 'Créer un code QR'], ['employee', '/mes-qr-codes', 'Mes codes QR'],
      ['partner', '/partenaire/tableau-de-bord', 'Tableau de bord partenaire'],
      ['partner', '/partenaire/transactions', 'Encaisser un paiement'],
      ['partner', '/partenaire/compte', 'Mon compte partenaire'],
      ['admin', '/admin/tableau-de-bord', 'Tableau de bord national'],
      ['admin', '/admin/comptes', 'Comptes salariés'],
      ['admin', '/admin/demandes-partenaires', 'Demandes d’inscription partenaires'],
      ['admin', '/admin/abondements', 'Abondements employeurs'],
    ]
    for (const [role, page, title] of routes) {
      const directory = await mkdtemp(path.join(tmpdir(), 'cartepro-browser-'))
      try {
        const pageUrl = base.replace('/api/v1', '') + '/test-login?email=' + role + '@test.invalid&page=' + encodeURIComponent(page)
        const html = await new Promise((resolve, reject) => {
          const child = spawn('chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--user-data-dir=' + directory, '--dump-dom', '--virtual-time-budget=10000', pageUrl])
          let output = ''
          const timeout = setTimeout(() => { child.kill(); reject(new Error('Browser timeout: ' + page)) }, 40000)
          child.stdout.on('data', chunk => { output += chunk })
          child.stderr.resume()
          child.on('error', reject)
          child.on('exit', code => { clearTimeout(timeout); code ? reject(new Error('Browser exit: ' + code)) : resolve(output) })
        })
        assert.ok(!html.includes('Impossible de charger cette page'), 'Erreur de page : ' + page)
        assert.ok(html.toLowerCase().includes(title.toLowerCase()), 'Contenu absent : ' + page)
        console.log('Navigateur OK:', page)
      } finally { await rm(directory, { recursive: true, force: true }) }
    }
  }
  console.log('OK: pages API, trois rôles, validation partenaire, QR signé, double paiement concurrent, solde, audit, immutabilité, expiration, annulation, révocation.')
} finally {
  if (server) await new Promise(resolve => server.close(resolve))
  await prisma?.$disconnect()
  await adminDb.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
  await adminDb.$disconnect()
}
