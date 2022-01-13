const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const photoController = require("./controllers/photoController");
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect("mongodb://localhost/pcat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

// MIDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // url deki datayı okumamızı sağlıyor.
app.use(express.json()); // datayı json a çevirmek için
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

const port = 5000;

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//ROUTES
// PHOTO CONTROLLERS
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

// PAGE CONTROLLERS
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
