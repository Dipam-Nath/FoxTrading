
function getData(){
 
const fs=require('fs');

const access_data=JSON.parse(fs.readFileSync('./src/cred.json','utf-8'));
const a_token=access_data.access_token;



var KiteTicker = require("kiteconnect").KiteTicker;
var ticker = new KiteTicker({
	api_key: "6zfi2amoxjco04yo",
	access_token:a_token
});


//first 15 min candle





ticker.connect();
ticker.on("ticks", onTicks);
ticker.on("connect", subscribe);


const stockData = {
    256265: { name: "NIFTY 50" ,
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
             },

    738561:{name: "RELIANCE",
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
            },
    779521: { name: "SBIN",
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
             },
    895745: { name: "TATASTEEL",
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
             },
    2813441:{name:"RADICO",
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
            },

    884737:{name:"TATAMOTORS",
              low:Number.MAX_SAFE_INTEGER,
              high:Number.MIN_SAFE_INTEGER,
              status:"",
              stoploss:"NULL"
            },
    4451329:{name:"ADANIPOWER",
            low:Number.MAX_SAFE_INTEGER,
            high:Number.MIN_SAFE_INTEGER,
            status:"",
            stoploss:"NULL"
          },
    3403521:{name:"VISASTEEL",
          low:Number.MAX_SAFE_INTEGER,
          high:Number.MIN_SAFE_INTEGER,
          status:"",
          stoploss:"NULL"
        },
    2903809:{name:"AFFLE",
        low:Number.MAX_SAFE_INTEGER,
        high:Number.MIN_SAFE_INTEGER,
        status:"",
        stoploss:"NULL"
      },
    

};


var items = [256265,738561, 779521,895745,2813441,884737,4451329,3403521,2903809];

//data getting in onticks


const from="09:15:00"
const to="09:29:58"


 
function onTicks(ticks) {
    const current=new Date().toLocaleTimeString("en-GB",{
        hour12:false
     });

    for (let i = 0; i < ticks.length; i++) {

        //extraction

         
        var instrumentToken = ticks[i].instrument_token;
        var ltp = ticks[i].last_price;


        stockData[instrumentToken].lastTradePrice = ltp;

        if(current>=from && current<=to){

             if(ltp > stockData[instrumentToken].high){
                 stockData[instrumentToken].high=ltp;
             }
            
             if(ltp < stockData[instrumentToken].low){
                 stockData[instrumentToken].low=ltp;
             }

        }


        


        if (ltp > stockData[instrumentToken].high) {
            // console.log("buy");

            stockData[instrumentToken].status = "Buy";
            stockData[instrumentToken].stoploss = stockData[instrumentToken].low;
        } 
        else if (ltp < stockData[instrumentToken].low) {
            // console.log("sell");
            stockData[instrumentToken].status = "Sell";
            stockData[instrumentToken].stoploss = stockData[instrumentToken].high;        
        } 
        else{
            stockData[instrumentToken].status = "Hold";
            stockData[instrumentToken].stoploss = "Null";
        }
    
        
    }
 
    //for high low
   

        const data = [
            {
                Nifty: stockData[items[0]],
                Reliance: stockData[items[1]],
                Sbi: stockData[items[2]],
                Tata:stockData[items[3]],
                Radico:stockData[items[4]],
                Tatamotors:stockData[items[5]],
                Adani:stockData[items[6]],
                Visa:stockData[items[7]],
                Affle:stockData[items[8]],
                
                
    
            }
    
        ];
        console.log(data);
        fs.writeFileSync('./src/stock.json',JSON.stringify(data),'utf-8');

    } 


   function subscribe() {

	ticker.subscribe(items);
	ticker.setMode(ticker.modeFull, items);
   }

  


}

module.exports=getData;
// getData();





