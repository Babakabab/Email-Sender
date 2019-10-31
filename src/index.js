const express = require('express'),
      path = require('path'),
      app = express(), 
      chalk = require('chalk'),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      fs = require('fs'),
      router = express.Router();




app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const upload = multer({
    'dest':'images'
});





app.get('/',(req,res)=>{
    res.render('index.html');
});
app.post('/emails',upload.single('template'),(req,res)=>{
    let user = req.body['username'];
    let password = req.body['password'];

    let transporter = nodemailer.createTransport({

        service:'Yandex',
        auth:{
            user:user,
            pass:password
        }
    });
    const emailBody = fs.readFileSync('public/email-template.html');

    const msg = {
        from:user,
        // from: 'babakjahangiri123@gmail.com',
        // to: 'babak_jahangiry@yahoo.com',
        subject: 'Hemenis ile Hemenis',
        html:emailBody
    };
    const emailAddresses = req.body['email'].split(" ");
    emailAddresses.forEach(to => {
        msg.to = to;
        transporter.sendMail(msg,(err,info)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(info);
            }
        });
    });
    console.log('password',password);
    


    // transporter.sendMail(mailOptions,(err,info)=>{
    //     if (err){
    //         console.log(error);
    //     }
    //     else{
    //         console.log(info);
    //     }
    // });

});

app.listen(3000,()=>{console.log(chalk.blue("\n\nYOYO SERVER IS UP 'N running BABY!!"))});