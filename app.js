const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view-engine", 'ejs');

mongoose.connect("mongodb://localhost:27017/deltaxDB", { useNewUrlParser: true });

const songSchema = new mongoose.Schema ({
  name: String,
  dateOfRelease: String,
  cover: String,
  artistName: {type: [String], sparse: true},
  rate: String
});

const artistSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  bio: String,
  songsSung: {type: [String], sparse: true},
  rate: Number
})

const Song = mongoose.model("Song", songSchema);
const Artist = mongoose.model("Artist", artistSchema);


app.get("/", function(req, res) {
    Song.find((err, foundSongs) => {
      if(err) {
        console.log(err);
      } else {
        Artist.find((err, foundArtists) => {
          if(err) {
            console.log(err);
          } else {
            foundSongs.sort((a, b) => {
              return b.rate - a.rate;
            })
            foundArtists.sort((a, b) => {
              return b.rate - a.rate;
            })
            res.render("home.ejs", {songs: foundSongs, artists: foundArtists});
          }
        })
      }
    })
});

app.get("/add-new-songs", (req, res) => {
  Artist.find((err, foundList) => {
    if(err) {
      console.log(err);
    } else {
      res.render("addsongs.ejs", {artists: foundList});
    }
  })
})

app.get("/add-new-artist", (req, res) => {
    res.render("addartist.ejs");
})

// ___________________________________________________________________

app.post("/", (req, res) => {
    const newSong = new Song({
      name: req.body.songName, 
      dateOfRelease: req.body.dor, 
      artistName: req.body.artistName,
      rate: Math.min(req.body.rate, 5)
    });

    if(Array.isArray(req.body.artistName)) {
      let artistsNameOfThisSong = req.body.artistName;
      for(let i=0; i<artistsNameOfThisSong.length; i++) {
        Artist.find({name: artistsNameOfThisSong[i]}, function(err, foundArtist) {
          if(err) {
            console.log(err);
          } else  {
            foundArtist[0].songsSung.push(req.body.songName);
            foundArtist[0].rate += Math.min(5, req.body.rate);
            foundArtist[0].save(function(err) {
              if(err) {
                console.log(err);
              } else {
                
              }
            });
          }
        })
      }
    } else {
      Artist.find({name: req.body.artistName}, function(err, foundArtist) {
        if(err) {
          console.log(err);
        } else  {
          foundArtist[0].songsSung.push(req.body.songName);
          foundArtist[0].rate += Math.min(5, req.body.rate);
          foundArtist[0].save(function(err) {
            if(err) {
              console.log(err);
            } else {
  
            }
          });
        }
      })
    }

    newSong.save((err) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    })
})

app.post("/add-new-songs", (req, res) => {
  const newArtist = new Artist({
    name: req.body.artistName, 
    dateOfBirth: req.body.dob, 
    bio: req.body.bio,
    rate: 0
  });

  newArtist.save((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/add-new-songs");
    }
  })
})

// _____________________________________________________________

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (res, req) {
  console.log("Server started on port 3000");
});

