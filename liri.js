// Liri is a NODE app
// Include NPM packages
// twitter homeworkLiriBot
var request = require("request");//use this to access OMDB
var inquirer = require("inquirer");//this awesome prompt package
var Twitter = require("twitter");//* [Twitter](https://www.npmjs.com/package/twitter)
var Spotify = require("node-spotify-api");//[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
var geocoder = require("dotenv");//* [DotEnv](https://www.npmjs.com/package/dotenv)
var fs = require("fs");//fs Node package to read write from random.txt

require("dotenv").config();
var keys = require("./keys.js");

inquirer.prompt([
  {
    type: "list",
    message: "Which command do you choose?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
    name: "command"
  }
]).then(function (inquirerResponse) {
  switch (inquirerResponse.command) {
    case "my-tweets":
      tweets();
      break;
    case "spotify-this-song":
      songs();
      break;
    case "movie-this":
      movies();
      break;
    case "do-what-it-says":
      doit();
      break;
  }
});

function tweets() {

  // var keys = require("./keys.js");
  // console.log(keys.twitter);
  var client = new Twitter(keys.twitter);
  // console.log(client);
  var params = {
    user_id: 'optccaccount',
    count: 20
  }
  //finally found that I wanted user timeline! exciting
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // grab the tweets using tweets.text
      for (i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }
  });
}

function songs() {
  inquirer.prompt([
    {
      type: "text",
      message: "Artist Name?",
      name: "artist"
    },
    {
      type: "text",
      message: "Song Name?",
      name: "song"
    },
  ]).then(function (inquirerResponse) {
    //Validate answers were chosen, otherwise ... Nazi-Buddah
    if (inquirerResponse.artist || inquirerResponse.song) {
      artist = inquirerResponse.artist;
      song = inquirerResponse.song;
      console.log("input artist " + inquirerResponse.artist)
      console.log("input song " + inquirerResponse.song)
    } else {
      artist = "Ace of Base";
      song = "The Sign"
    };
    // run the query
    spotty();
  });
}
// What a disaster to dig through
function spotty() {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query:artist+"+"+song, limit: 3 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(data.albums.items);
    console.log("Artist: "+artist);
    console.log("Song: "+song);
    // console.log(data.tracks.items[0]);
    console.log("Preview Link: "+ data.tracks.items[0].album.external_urls.spotify);
    console.log("Album name: " + data.tracks.items[0].album.name);
  });
}
function movies() {
  inquirer.prompt([
    {
      type: "text",
      message: "What Movie are you interested in?",
      name: "movie"
    }
  ]).then(function (inquirerResponse) {
    //Validate answers were chosen, otherwise ... Nazi-Buddah 
    if (inquirerResponse.movie) {
      movie = inquirerResponse.movie;
    } else {
      movie = "Mr.+Nobody";
    };
    movied();

  });
}
var movied = function () {
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log(response)
      // console.log(JSON.parse(body))
      // * Title of the movie.
      console.log("Move Title: " + JSON.parse(body).Title);
      // * Year the movie came out.
      console.log("Release Year " + JSON.parse(body).Year);
      // * IMDB Rating of the movie.
      console.log("IMDB Rating: " + JSON.parse(body).Rated);
      // * Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rated);
      // * Country where the movie was produced.
      console.log("Country(s) of production: " + JSON.parse(body).Country);
      // * Language of the movie.
      console.log("Language: " + JSON.parse(body).Language);
      // * Plot of the movie.
      console.log("Plot: " + JSON.parse(body).Plot);
      // * Actors in the movie.
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function doit() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    // console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    // console.log(dataArr);
    // dataArr[1].replace(/['"]+/g, '');
    // console.log(dataArr[1]);
    // We will then re-display the content as an array for later use.
    // console.log(dataArr[0]);
    switch (dataArr[0]) {
      case "my-tweets":
        tweets();
        break;
      case "spotify-this-song":
        artist = " ";
        song = dataArr[1].replace(/['"]+/g, '').trim();  //need to do some stringery to get the quotes off this bugger
        spotty();
        break;
      case "movie-this":
        movie = dataArr[1].replace(/['"]+/g, '').trim();  //need to do some stringery to get the quotes off this bugger
        movied();
        break;
      // case "do-what-it-says":
      //   doit();
      //   break;
    }
  });
}


