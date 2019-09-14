const express = require("express"); //server
const morgan = require("morgan"); //logger
const mongoose = require("mongoose"); //mongodb
const axios = require("axios"); //ajax
const cheerio = require("cheerio"); //"jquery scraping"
const db = require("./models") //???
​
const PORT = 3000;
​
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
​
mongoose.connect("mongodb://localhost/scraper", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
​
​
app.get("/scrape"),function(req,res){
    axios.get("https://www.mlbtraderumors.com/").then(function(response){
        var $ = cheerio.load(response.data);
        $("article.h2").each(function(i, element){
            const result = {};
            console.log(result);
            // result.title = $(this)
            // $(this) === $(element);
            // var url = $(this).children(".tease__img").children().attr("href");
        })
​
    })
    res.json({"something":true});
}
​
​
​
app.get("/", function(req, res){
    console.log("WHY??")
    res.send("Home Page!");
})
​
app.get("/savedArticles", function(req, res){
    axios.get("https://www.ajc.com/").then(function(response){
        var $ = cheerio.load(response.data);
        //console.log($);
        $("li.tease").each(function(i, element){
            $(this) === $(element);
            var url = $(this).children(".tease__img").children().attr("href");
            //console.log(url);
​
            db.Article.create({
                url: url
              }).then(
              function(err, inserted) {
                if (err) {
                  // Log the error if one is encountered during the query
                  console.log(err);
                }
                else {
                  // Otherwise, log the inserted data
                  console.log(inserted);
                }
              });
        })
​
    })
    console.log(db.Article)
    res.send("Saved Articles!");
})
​
​
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);    
})
​
​
//config middleware
​
// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));