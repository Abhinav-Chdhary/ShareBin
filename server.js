const express = require("express");
const app = express();
//view engines allow us to render web pages
//using template files, one of them is embedded javaScript
//view engines also have a template file that can take arguments
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    const code = `Welcome to ShareBin!

Use the commands at the top right corner to 
create a new file share with others.`;
    res.render("code-display", { code });
});

app.listen(3000);
