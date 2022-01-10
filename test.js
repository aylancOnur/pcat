const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// connect db or create a db
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema
const PhotoSchema = new Schema({
  title: String,
  desc: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

// CREATE A PHOTO
Photo.create({
  title: "Photo Title 2",
  desc: "Photo desc 2",
});

// READ A PHOTO
// Photo.find({}, (err, data) => {
//     console.log(data)
// });

// UPDATE A PHOTO
// const id = "61dc97024d5c48c14e82e352";

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: "Updated Title",
//     desc: "Updated desc",
//   },
//   {
//     new: true,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// DELETE A PHOTO

// const id = "61dc99157b60bb4acd0e50f3";

// Photo.findByIdAndDelete(id, (err, data) => {
//   console.log("Photo is removed..");
// });
