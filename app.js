const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const { default: mongoose } = require("mongoose");

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

let artist = {name: String, dob: Date, bio: String};
let artists = [];
// let song = {name: String, dateOfRelease: Date, cover: };
let songs = [];
let user = {name: String, email: String};
let users = [];

app.get("/", function(req, res) {
    let listOfSongs = [], listOfArtists = [];
    // Artist.find((err, foundArtists) => {
    //   if(err) {
    //     console.log(err);
    //   } else {
    //     listOfArtists = foundArtists;
    //     console.log(foundArtists);
    //   }
    // })
    Song.find((err, foundSongs) => {
      if(err) {
        console.log(err);
      } else {
        // listOfSongs = foundSongs;
        // console.log(foundSongs);
        Artist.find((err, foundArtists) => {
          if(err) {
            console.log(err);
          } else {
            // listOfArtists = foundArtists;
            // console.log(foundArtists);
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

    // res.render("home.ejs", {songs: listOfSongs, artists: listOfArtists});
    // res.render("home.ejs", {songs: songs});
});

app.get("/add-new-songs", (req, res) => {
  Artist.find((err, foundList) => {
    if(err) {
      console.log(err);
    } else {
      res.render("addsongs.ejs", {artists: foundList});
      // console.log(foundList);
    }
  })
    // res.render("addsongs.ejs", {artists: artists});
})

app.get("/add-new-artist", (req, res) => {
    res.render("addartist.ejs");
})

// ________________________________________________

app.post("/", (req, res) => {
    const newSong = new Song({
      name: req.body.songName, 
      dateOfRelease: req.body.dor, 
      artistName: req.body.artistName,
      rate: Math.min(req.body.rate, 5)
    });
    // console.log("req.body.artistName = " + req.body.artistName);
    // let 
    if(Array.isArray(req.body.artistName)) {
      let artistsNameOfThisSong = req.body.artistName;
      for(let i=0; i<artistsNameOfThisSong.length; i++) {
        Artist.find({name: artistsNameOfThisSong[i]}, function(err, foundArtist) {
          if(err) {
            console.log(err);
          } else  {
            console.log(foundArtist);
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
          // console.log(foundArtist);
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


    // songs.push({ name: req.body.songName, 
    //              dateOfRelease: req.body.dor, 
    //              artistName: req.body.artistName,
    //              rate: Math.min(req.body.rate, 5)
    //            });
    
    // songs.sort((a,b) => {
    //   return b.rate - a.rate;
    // });
    // res.render("home.ejs", {songs: songs});
})

app.post("/add-new-songs", (req, res) => {
  const newArtist = new Artist({
    name: req.body.artistName, 
    dateOfBirth: req.body.dob, 
    bio: req.body.bio,
    rate: 0
    // rate: Math.min(req.body.rate, 5)
  });

  newArtist.save((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/add-new-songs");
    }
  })


    // artists.push({name: req.body.artistName,
    //               dob: req.body.dob,
    //               bio: req.body.bio
    //              });
    // res.render("addsongs.ejs", {artists: artists});
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (res, req) {
  console.log("Server started on port 3000");
});


