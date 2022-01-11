const express = require("express");
const ejs = require("ejs");
const app = express();

// MIDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // url deki datayı okumamızı sağlıyor.
app.use(express.json()); // datayı json a çevirmek için

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

app.post("/photos", (req, res) => {
  console.log(req.body);
  res.redirect("/ ");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
