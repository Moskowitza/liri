// Liri is a NODE app
// Include NPM packages
// twitter homeworkLiriBot
var request = require("request");//use this to access OMDB
var inquirer = require("inquirer");//this awesome prompt package
var Twitter = require("twitter");//* [Twitter](https://www.npmjs.com/package/twitter)
var spotify = require("node-spotify-api");//[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
var geocoder = require("dotenv");//* [DotEnv](https://www.npmjs.com/package/dotenv)

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
    var client = new Spotify(keys.spotify);
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
  });
 }


function movies() {
  // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {

  //   // If the request is successful (i.e. if the response status code is 200)
  //   if (!error && response.statusCode === 200) {

  //     // Parse the body of the site and recover just the imdbRating
  //     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
  //     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  //   }

  // });
}
function doit() { }


// // Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });


// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Feel free to change the text in that document to test out the feature for other commands.


