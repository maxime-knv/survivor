import { spawn } from 'node:child_process'
// Un seul démarrage pour le frontend et l'API : plus de proxy vers un port vide.
const processes = [
  spawn('npm', ['run', 'dev', '--prefix', 'server'], { stdio: 'inherit' }),
  spawn('npm', ['run', 'dev:front'], { stdio: 'inherit' }),
]
function stop() { for (const child of processes) child.kill('SIGTERM') }
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
for (const child of processes) child.on('exit', code => { stop(); process.exitCode = code || 0 })
