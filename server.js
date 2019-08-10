const express = require('express')
const fs = require('fs')

const port = 80
const serverIP = '192.168.0.11'
const app = express()

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/web_note.html`)
})

app.get('/about', (req, res) => {
    res.sendFile(`${__dirname}/static/about.txt`)
})

app.listen(port, serverIP, () => {
    console.log(`listening on port ${port}`)
})