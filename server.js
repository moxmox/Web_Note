const express = require('express')
const fs = require('fs')

const port = 80
const serverIP = '192.168.0.8'
const app = express()

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/web_note.html`)
})

app.listen(port, serverIP, () => {
    console.log(`listening on port ${port}`)
})