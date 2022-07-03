var express = require("express");

var app = express();

app.use(express.static("public"));

const path = require("path");

const route = express.Router();

const port = 3000;

const myServer = app.listen(port, () => {
  console.log(`The app is listening on port: ${port}`);
});

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

route.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/", route);
