const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const fs = require("fs");
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
app.use(fileUpload());

const port = 5000;

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render("index", {
    photos,
  });
});

app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    }); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
