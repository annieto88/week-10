var action = process.argv[2];

var nodeArgs = process.argv;

var value = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        value = value + "+" + nodeArgs[i];

    } else {

        value = value + nodeArgs[i];
    }
}

switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        imdb();
        break;

    case 'do-what-it-says':
        dwis();
        break;
}



//TWITTER________________________________________________________

function twitter() {
    var fs = require('fs');
    var twitterKey = require('./keys.js');
    var Twitter = require('twitter');
    var client = new Twitter(twitterKey.twitterKeys);
    var params = { screen_name: value, count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("=============================================");
            console.log("Here are the most recent tweets");

            for (var i = 0; i < tweets.length; i++) {

                console.log("_____________________________________________");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
}

//SPOTIFY________________________________________________________

function spotify() {

    if (value != false) {
        var spotify = require('spotify');
        var Spotify = require("node-spotify-api");
        var spotify = new Spotify({
            id: '853f573b1eda4cf2a498dd34854ccdbf',
            secret: '4721f12f380e4d3ab5192e9c79bd4376',
        });

        var getArtistNames = function(artist) {
            return artist.name;
          };

// Function for running a Spotify search
var getMeSpotify = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
  

//IMDB________________________________________________________

function imdb() {
    var request = require('request');

    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

        if (value != false) {

            console.log("======================================================================");
            console.log("The movie's name is: " + JSON.parse(body).Title);
            console.log("");
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("");
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("This movie was produced in the: " + JSON.parse(body).Country);
            console.log("");
            console.log("The language for this movie is in: " + JSON.parse(body).Language);
            console.log("");
            console.log("The movie's Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("The movie's Actor's: " + JSON.parse(body).Actors);
            console.log("");
            console.log("");
            console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
            console.log("");
            console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
            console.log("");
        } else {
            var request = require('request');
            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
                console.log("======================================================================");
                console.log("The movie's name is: " + JSON.parse(body).Title);
                console.log("");
                console.log("The movie was released in: " + JSON.parse(body).Year);
                console.log("");
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("");
                console.log("This movie was produced in the: " + JSON.parse(body).Country);
                console.log("");
                console.log("The language for this movie is in: " + JSON.parse(body).Language);
                console.log("");
                console.log("The movie's Plot: " + JSON.parse(body).Plot);
                console.log("");
                console.log("The movie's Actor's: " + JSON.parse(body).Actors);
                console.log("");
                console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
                console.log("");
                console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
                console.log("");
            });
        }
    });
}

//do-what-it-says________________________________________________

function dwis() {
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function(error, data) {
        data = data.split(',');

        var command;
        var parameter;

        // for (var i = 0; i < data.length; i++) {
        //     result = data[i];
        // }
        if (data.length == 2) {
            command = data[0];
            parameter = data[1];
            // console.log(command);
            // console.log(parameter);
        }
        // PRINTS THE CONTENTS OF DATA WHICH IS IN RESULT 
        //console.log(result);

        // if (result != false) {
        parameter = parameter.replace('"', '');
        parameter = parameter.replace('"', '');
        // console.log(parameter);

        switch (command) {
            case 'my-tweets':
                value = parameter;
                twitter();
                break;

            case 'spotify-this-song':
                value = parameter;
                spotify();
                break;

            case 'movie-this':
                value = parameter;
                imdb();
                break;
        }

    });
}
