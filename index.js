const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.static("public"));

const port = 5000;

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
