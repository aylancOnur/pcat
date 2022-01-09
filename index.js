const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));

const port = 5000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
