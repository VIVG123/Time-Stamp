//init project
var express = require('express') ;
var app = express() ;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public')) ;

app.get("/" , function(req,res){
    res.sendFile(__dirname + '/views/index.html') ;
}) ;

//first API endpoint...
app.get("/api/hello" , function (req ,res){
    res.json({greeting: 'hello API'}) ;
}) ;

//API endpoint without Date
app.get("/api/timestamp/" , (req ,res)=> {
    res.json( { unix : Date.now() , utc : Date() } ) ;
}) ;

//API endpoint with date parameter
app.get("/api/timestamp/:date" , (req , res) => {
    const d = req.params.date ;
    
    if(/\d{5,}/.test(d))
    {
        const dateInt = parseInt(d) ;
        res.json( {unix : dateInt , utc : new Date(dateInt).toUTCString() })
    }

    else
    {
        let dateObject = new Date(d) ;

        if(dateObject.toString() === "Invalid Date")
        {
            res.json({error : "Invalid Date"}) ;
        }

        else
        {
            res.json({unix : dateObject.valueOf() , utc : dateObject.toUTCString() }) ;
        }
    }
})


//listen for requests :)
var listener = app.listen(process.env.PORT, ()=>{
    console.log('Your app is listening on port' + listener.address().port ) ;
    console.log("http://localhost:" + listener.address().port) ;
})