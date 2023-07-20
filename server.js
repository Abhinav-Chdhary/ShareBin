const express = require("express");
const app = express();
//view engines allow us to render web pages
//using template files, one of them is embedded javaScript
//view engines also have a template file that can take arguments
app.set("view engine", "ejs");
app.use(express.static("public"));
//to get data from request
app.use(express.urlencoded({extended: true}))

//home page
app.get("/", (req, res) => {
    const code = `Welcome to ShareBin!

Use the commands at the top right corner to 
create a new file share with others.`;
    res.render("code-display", { code });
});

//new page
app.get("/new", (req, res)=>{
    res.render("new.ejs");
});

//save a text
app.post("/save", (req, res)=>{
    //logs the value
    console.log(req.body.value);
});


app.listen(3000);
