const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000 || process.env.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// database connection
const data = fs.readFileSync('./database.json');
const  conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();
//get
app.get('/api/customers', (req,res) => {
    connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Node server start! ${port}`));
