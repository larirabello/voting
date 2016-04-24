var express = require("express");
var app = express();
var server = require("http").Server(app);
var r = require("rethinkdb");
var bodyParser = require("body-parser");

//var io = require("socket.io")(server);

app.use("/public", express.static('public'));
app.set("view engine", 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.get("/", function(req, res) {
  r.connect({host:"localhost", port: 28015}, function(err, conn) {
     r.db("test").table("food").sample(2).run(conn, function(error, cursor) {
       cursor.toArray(function(error, results) {
           //if (conn != null) conn.close();
           r.db("test").table("food").orderBy(r.desc("votes")).limit(4).run(conn, function(er, c) {
             c.toArray(function(s, resp) {
               res.render('pages/index', {
                 foodlist: results,
                 topN: resp
               });
             });
           });

       });
     });
  });
});

app.post("/vote", function(req,res) {

  r.connect({host:"localhost", port: 28015}, function(err, conn) {
    r.db("test").table("food").get(req.body.id).update({votes: r.row('votes').add(1).default(1)}).run(conn, function(error, cursor) {
      if (error) console.log(error);
    });
  });
  res.redirect("/");
});

server.listen(3000, function() {
  console.log("Certo! Subiu na porta 3000.");
});
