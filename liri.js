// Liri is a NODE app
// Include NPM packages
// twitter homeworkLiriBot
var twitter = require("twitter");//* [Twitter](https://www.npmjs.com/package/twitter)
var spotify = require("spotify");//[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
var request = require("request");//use this to access OMDB
var geocoder = require("dotenv");//* [DotEnv](https://www.npmjs.com/package/dotenv)
var inquirer = require("inquirer");//this awesome prompt package
require("dotenv").config();


10. Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`

inquirer.prompt([
    {
      type: "input",
      name: "userInput",
      message: "Which location or landmark would you like to geocode?"
    }
]).then(function(location) {
    // console.log(location.userInput);
    // Then use the Google Geocoder to Geocode the address
    geocoder.geocode(location.userInput, function(err, data) {
      console.log(JSON.stringify(data, null, 2));
    });
  });
   


