var express = require("express");
var app = express();
var server = require("http").Server(app);
var r = require("rethinkdb");

//var io = require("socket.io")(server);

app.use("/public", express.static('public'));
app.set("view engine", 'ejs');

app.get("/", function(req, res) {
  r.connect({host:"localhost", port: 28015}, function(err, conn) {
     r.db("test").table("food").sample(2).run(conn, function(error, cursor) {
       cursor.toArray(function(error, results) {
           if (conn != null) conn.close();
           res.render('pages/index', {
             foodlist: results,
           });
       });
     });
  });
});

server.listen(3000, function() {
  console.log("Certo! Subiu na porta 3000.");
});
