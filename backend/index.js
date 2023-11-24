const db = require('./db')
const express = require('express')

db();

const app = express()
const port = 8080

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
