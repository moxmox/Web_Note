const express = require('express')
const fs = require('fs')

const port = 3000
const app = express()

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/web_note.html`)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})