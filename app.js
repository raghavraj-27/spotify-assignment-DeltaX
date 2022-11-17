const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view-engine", 'ejs');

let artist = {name: String, dob: Date, bio: String};
let artists = [];
// let song = {name: String, dateOfRelease: Date, cover: };
let songs = [];
let user = {name: String, email: String};
let users = [];

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/add-new-songs", (req, res) => {
    res.render("addsongs.ejs");
})

app.get("/add-new-artist", (req, res) => {
    res.render("addartist.ejs");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (res, req) {
  console.log("Server started on port 3000");
});


