const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const port = +process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (_req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  const { upfile } = req.files;
  const { name, mimetype: type, size } = upfile;

  res.status(200).json({ name, type, size });
});

app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
