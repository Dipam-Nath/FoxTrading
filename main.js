// api key is “6zfi2amoxjco04yo”
// api key is “request_token_here”,”p2zkzvivv3y8fveacsb9ciqnu5y71iul”

//importing module



    var api_secret="p2zkzvivv3y8fveacsb9ciqnu5y71iul"

    var KiteConnect = require("kiteconnect").KiteConnect;
    const prompt=require('prompt-sync')();
    const fs=require('fs');
    
    
    var api_secret="p2zkzvivv3y8fveacsb9ciqnu5y71iul";
    
    var kc = new KiteConnect({
        api_key: "6zfi2amoxjco04yo",
        
    })
        console.log(kc.getLoginURL());//for login
       //get the token
        var request_token=prompt("Get a request token here=");
        
        //asynchronous
        //on success we get response object with credential detail and storing to json
    
        kc.generateSession(request_token,api_secret)
        .then((response)=> {
    
            fs.writeFileSync('./src/cred.json',JSON.stringify(response));
            console.log(response);
            kc.setAccessToken(response.access_token);

      
            
        })
        .catch(function(err) {
            console.log(err);
            
        });


