const express = require("express");

const app = express();

app.use(express.static("./dist/meeto"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/meeto" });
});

app.listen(process.env.PORT || 4200);
