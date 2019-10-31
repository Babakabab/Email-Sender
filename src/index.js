const express = require('express'),
      path = require('path'),
      app = express(), 
      chalk = require('chalk'),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      router = express.Router();




app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const upload = multer({
    'dest':'images'
});

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'babakjahangiri123@gmail.com',
        pass:'Iusethisforpython'
    }
});
const mailOptions = {
    from: 'babakjahangiri123@gmail.com',
    to: 'babak_jahangiry@yahoo.com',
    subject: 'THIS IS A TEST MOFO!',
    html:'<p> WHATEVA MAYYNN</p>'
};


app.get('/',(req,res)=>{
    res.render('index.html');
});
app.post('/emails',upload.single('template'),(req,res)=>{
    console.log(req.body);

});

app.listen(3000,()=>{console.log(chalk.blue("\n\nYOYO SERVER IS UP 'N running BABY!!"))});