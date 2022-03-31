const app = require('./core/app')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Up & running on http://localhost:${PORT}`) })
