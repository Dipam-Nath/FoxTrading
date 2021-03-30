const express=require('express');
const path=require('path');
const getData=require('./src/datab');
const app=express();
var KiteConnect = require("kiteconnect").KiteConnect;
var api_secret="p2zkzvivv3y8fveacsb9ciqnu5y71iul"
const fs=require('fs');

const port=8001;

//date setting
const date=new Date();
const from="09:14:00"
const to="15:31:00"

const staticPath=path.join(__dirname,"public");
const another=path.join(__dirname,"src/stock.json");
const another1=path.join(__dirname,"src/hl.json");
const user=path.join(__dirname,'src/user.json');

//for normal page
//middlewares


app.set("view engine","hbs");
app.use(express.static(staticPath));
app.use('/stock.json',express.static(another));
app.use('/hl.json',express.static(another1));
app.use('/user.json',express.static(user));
app.use(express.urlencoded({extended:false}));





app.get("/",(req,res)=>{
    res.render('login');
})



app.post("/",(req,res)=>{

    const request_token=req.body.req_token;
    res.redirect('localhost:8001/');

    var kc = new KiteConnect({
        api_key: "6zfi2amoxjco04yo",
        
    })

    kc.generateSession(request_token,api_secret)
        .then((response)=> {
    
            fs.writeFileSync('./src/cred.json',JSON.stringify(response));
            console.log(response);
            kc.setAccessToken(response.access_token);
            getData();
            
            
        })
        .catch(function(err) {
            console.log(err);
            
        });
})




app.use('/index',(req,res)=>{
   

    const current=new Date().toLocaleTimeString("en-GB",{
        hour12:false
     });
    
    if((date.getDay()!=0 && date.getDay()!=6) && (current>=from && current<=to))
    {
        
        res.render('index');
        
       
    }
    else {
       
        res.render('holiday');
        
    }

})





 


app.listen(port,()=>{
    console.log(`listening at ${port}`)

})

