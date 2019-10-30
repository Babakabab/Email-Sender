const express = require('express'),
      path = require('path')
      app = express(), 
      router = express.Router();
app.get('/',(req,res)=>{
    res.render('index');
});
// app.use()

app.listen(3000);