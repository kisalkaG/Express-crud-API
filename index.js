const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const port = 5000;




//using middleware
app.use(logger);

// app.get('/',function(req,res){
//    res.send("<h1>Hello World</h1>");
// })

// app.get('/user',function (req,res){
//     res.send("<h1>hi!!!</h1>");
// })

// app.get('/get-file',function (req,res){
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })




//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/members', require('./routes/api/members'));


app.listen(port, function(){

    console.log(`App is running at port '${port}'`);
})



