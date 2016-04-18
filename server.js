var express = require("express");
var app = express();

var server = require("http").Server(app);

var io = require("socket.io")(server);

app.get("/", function(req, res) {
  res.send("Hello");
});

server.listen(3000, function() {
  console.log("Certo! Subiu na porta 3000.");
});
