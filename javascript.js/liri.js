var twitterkeys = require("./keys.js");
// ./ before a file to let text editor know i am looking for file
var commands = process.argv[2];
var search = process.argv[3];
var request = require("request");

if (commands === "my-tweets") {
    twitter();
}

if (commands === "spotify-this-song") {
    spotify();
}

if (commands === "movie-this") {
    movie();
}

if (commands === "do-what-it-says") {
    says();
}

function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Release Year: " + JSON.parse(body).Year);
        }
    });

}