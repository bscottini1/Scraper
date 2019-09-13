const express = require("express"); //server
const morgan = require("morgan"); //logger
const mongoose = require("mongoose"); //mongodb
const axios = require("axios"); //ajax
const cheerio = require("cheerio"); //"jquery scraping"
const db = require("./models") //???

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/scrape"),function(req,res){
    axios.get("https://www.ajc.com/").then(function(response){
        var $ = cheerio.load(response.data);
        console.log($);
    })
}



app.get("/", function(req, res){
    res.send("Home Page!");
})

app.get("/savedArticles", function(req, res){
    res.send("Saved Articles!");
})


app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);    
})


//config middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));