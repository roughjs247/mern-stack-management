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

const multer = require('multer');           // 사용자가 등록한 이미지는 multer라이브러리를 통해 고유이름으로 저장된다.
const upload = multer({dest : './upload'});

//get List
app.get('/api/customers', (req,res) => {
    connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
        res.send(rows);
    });
});

//post
app.use('/image',express.static('./upload')); // image url로 접근시  upload 폴더로 접근 되도록..

app.use('/api/customers', upload.single('image'), (req,res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
    let image = '/image/' + req.file.filename;  //database에 해당 이미지 경로
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [ image, name, birthday, gender, job]; // (null, image, name, birthday, gender, job)  ? 에 순서대로 매핑
    connection.query(sql, params, (err,rows,fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Node server start! ${port}`));
