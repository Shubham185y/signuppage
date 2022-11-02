const express = require("express");

const app = express();
const bodyparser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const https = require("https");

app.use(bodyparser.urlencoded({extended: true}));

app.post("/", function(req, res){
    const firstname = req.body.fname;
    const lastname =req.body.lname;
    const email = req.body.email;
    console.log(firstname , lastname , email);

    const data = 
        { members:[
            { email_address: email,
              status: "subscribed",
              merge_fields:{
                FNAME : firstname,
                LNAME : lastname
              }             
            }
        ]
    };

    const jsondata =JSON.stringify(data);
    const url ="https://us13.api.mailchimp.com/3.0/lists/8f691d488a";

    const options ={
        method: "POST",
        auth: "shubham:9e02f43dfe94c3ed7b6329d017e6a471-us13"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();
})

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

//9e02f43dfe94c3ed7b6329d017e6a471-us13


