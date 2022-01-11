const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Photo = require("./models/Photo");

const app = express();

mongoose.connect("mongodb://localhost/pcat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MIDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // url deki datayı okumamızı sağlıyor.
app.use(express.json()); // datayı json a çevirmek için

const port = 5000;

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  res.render("index", {
    photos,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  // async - await yapısı kullanacğız.
  await Photo.create(req.body); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
