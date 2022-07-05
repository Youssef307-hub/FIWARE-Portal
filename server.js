const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/", router);

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist/cdn"))
);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

const myServer = app.listen(port, () => {
  console.log(`The app is listening on port: ${port}`);
});


entites = {};

const request = require("request");



request({
  method: "GET",
  url: "http://localhost:1026/v2/entities/urn:ngsi-ld:Greenhouse:001",
  qs: { options: "keyValues" }
}, function (error, response, body) {
    if (error) throw new Error(error);
    entites = JSON.parse(body);
    console.log(entites);
    console.log(entites.id);
});



