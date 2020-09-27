const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000 || process.env.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//get
app.get('/api/customers', (req,res) => {
    res.send([
        {
        'id'   : 1,
        'image': 'https://placeimg.com/64/64/any',
        'name' : '이용빈',
        'birthday' : '900918',
        'gender' : 'male',
        'job'    : 'developer',
        },
        {
        'id'   : 2,
        'image': 'https://placeimg.com/64/64/1',
        'name' : '홍길동',
        'birthday' : '131244',
        'gender' : 'female',
        'job'    : 'student',
        },
        {
        'id'   : 3,
        'image': 'https://placeimg.com/64/64/2',
        'name' : '김길수',
        'birthday' : '515122',
        'gender' : 'male',
        'job'    : 'photograper',
        },          
    ]);
});

app.listen(port, () => console.log(`Node server start! ${port}`));
