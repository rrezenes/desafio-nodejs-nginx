const express = require('express')
const mysql = require('mysql')
const faker = require('faker')
const app = express()
const port = process.env.APP_PORT || 3000

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
})

app.get('/', (req, res) => {
    faker.locale = 'pt_BR';
    const nome = faker.name.findName()

    connection.query(`insert into people (name) values ('${nome}')`, (error, results, fields) => {
        if (error) throw error
        console.log(nome + ' inserido com sucesso!')
    })

    connection.query(`select name from people`, (error, results, fields) => {
        if (error) throw error
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ol>
                ${results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
            </ol>
        `)
    })
})

app.listen(port, () => {
    console.log('Servidor rodando na porta:', port);
})