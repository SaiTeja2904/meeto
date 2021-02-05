const express = require("express");

app.use(express.static("./dist/meeto"));

app.get("/*", function (req, res) {
  console.log("hello");
  res.sendFile("index.html", { root: "dist/meeto" });
});

server.listen(process.env.PORT || 4200);
