// Hot backup of the landing database, run inside the container.
// VACUUM INTO produces a consistent single-file copy while the app is running.
const Database = require('better-sqlite3')
const target = process.argv[2] || '/tmp/eskai-backup.db'
const db = new Database('/app/data/eskai.db', { readonly: true })
db.exec("VACUUM INTO '" + target + "'")
console.log('snapshot written to ' + target)
