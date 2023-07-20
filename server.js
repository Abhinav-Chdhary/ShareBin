const express = require("express");
const app = express();
//view engines allow us to render web pages
//using template files, one of them is embedded javaScript
//view engines also have a template file that can take arguments
app.set("view engine", "ejs");
app.use(express.static("public"));
//to get data from request
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/sharebin");

//home page
app.get("/", (req, res) => {
    const code = `Welcome to ShareBin!

Use the commands at the top right corner to
create a new file share with others.`;
    res.render("code-display", { code, language: "plaintext" });
});

//new page
app.get("/new", (req, res) => {
    res.render("new.ejs");
});

//save a text
app.post("/save", async (req, res) => {
    const value = req.body.value;
    try {
        const document = await Document.create({ value });
        res.redirect(`/${document.id}`);
    } catch (e) {
        res.render("new", { value });
    }
    console.log(value);
});

//for duplicate
app.get("/:id/duplicate", async (req, res)=>{
    const id = req.params.id;
    try {
        const document = await Document.findById(id);
        res.render("new", { value: document.value});
    } catch (e) {
        res.redirect("/${id}");
    }
});
//
app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id);
        res.render("code-display", { code: document.value, id });
    } catch (e) {
        res.redirect("/");
    }
});

app.listen(3000);
