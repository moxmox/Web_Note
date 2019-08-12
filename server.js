const express = require('express')

//server definition
const server = {
    port: 3000,
    ipaddr: '127.0.0.1',
    init: ''
}

//function definition for initializer
server.init = (cliOptions) => {

    if((cliOptions.length % 2 !== 0) && 
    cliOptions[0] != 'help'){
        console.error('\nIncomplete command!\n')
        console.error('See \'node server help\' for usage\n')
        return false
    }

    if(cliOptions[0] == 'help'){
        console.log('\n#########################################################')
        console.log('#\tWeb Note Server Script\t\t\t\t#')
        console.log('#\tUsage: node server <flag> [option]\t\t#')
        console.log('#\tExample: node server ip 192.168.1.9 port 3000\t#')
        console.log('#########################################################\n')
        return false
    }

    if(cliOptions.length > 0)
    {
        for(i=0; i<=cliOptions.length-1; i+=2)
        {
            if(cliOptions[i] == 'ip'){
                server.ipaddr = cliOptions[i+1]
            }

            if(cliOptions[i] == 'port'){
                server.port = cliOptions[i+1]
            }
        }
    }
    return true
}

//init server
if(!server.init(process.argv.slice(2, process.argv.length))){
    return
}

const app = express()

//configure routes
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/web_note.html`)
})

app.get('/about', (req, res) => {
    res.sendFile(`${__dirname}/static/about.txt`)
})

//start listening
app.listen(server.port, server.ipaddr, () => {
    console.log(`listening on: \n{\n\taddr: ${server.ipaddr}, \n\tport: ${server.port}\n} \n\n^C to Exit . . .`)
})