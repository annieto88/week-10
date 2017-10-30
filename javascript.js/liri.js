var twitterkeys = require("./keys.js");
var clientSpotify = require("./keys.js");
var client = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
// ./ before a file to let text editor know i am looking for file
var fs = require("fs");

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

var client = new Twitter({
    consumer_key: keystwitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});

function twitter() {
    console.log("\n\nMost recent Tweets\n".bold.underline.red);
    outputString("\nMost recent Tweets\n");

    var params = { screen_name: 'happycrunchyroll' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var total Tweets = tweets.length
            if (totalTweets > 20) {
                totalTweets = 20;
            }
            for (i = 0; i < totalTweets; ++i) {
                console.log(tweets[i].created_at.bold + ": " + tweets[i].red);
                outputString("\n" + tweets[i].created_at + ": " + tweets[i].text);
            }
            console.log("\n");
            outputString("\n");
        } else { console.log(error) }
    });
}

function spotifyThisSong(trackName) {
    if (trackName === undefined) {
        trackName = "The Sign by Ace of Base";
    }
    client.clientSpotify.search({ type: 'track', query: trackName }, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
            return;
        }
        var items = data.track.items;

        console.log("Number of albums with this track: " + items.length.bold);
        outputString("\nNumber of albums with this track: " + items.length);
        for (i = 0; i < items.length; ++i) {
            console.log("\nSong Name: ".bold + items[i].name.red.underline);
            console.log("   Preview Link of the song on Spotify: ".bold + items[i].preview_url.blue);
            console.log("     Album Name: ".bold + items[i].album.name);
            console.log("       Which has ".bold + items[i].artists.length + " artists performing on the track");

            outputString("\n");
            outputString("\nSong Name: " + items[i].name);
            outputString("\n    Preview Link of the song on Spotify: " + items[i].preview_url);
            outputString("\n     Album Name: " + items[i].album.name);
            outputString("\n      Which has " + items[i].artists.length + " artists performing on the track");

            for (k = 0; k < items[i].artists.length; ++k) {
                console.log("         Artist: ".bold + items[i].artists[k].name);
                outputString("\n        Artist: " + items[i].artists[k].name);
            }
        }
        console.log("\n");
        outputString("\n");
    });
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
            console.log("Title of Movie" + JSON.parse(body).Title);
            console.log("IMB Rating" + JSON.parse(body).imdbRating);
            console.log("Rating" + JSON.parse(body).Rated);
            console.log("Country" + JSON.parse(body).Country);
            console.log("Language" + JSON.parse(body).Language);
            console.log("Plot" + JSON.parse(body).Plot);
            console.log("Actors" + JSON.parse(body).Actors);
        }
    });

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function read(err, data) {
        if (err) {
            return console.log(err);
        }

        if (data.indexOf(",") > -1) {
            var myOwnProcessArgv = data.split(",");
            param = myOwnProcessArgv[1].trim();
            userWants = myOwnProcessArgv[0].trim();
        } else {
            userWants = data.trim();
        };

        if (userWants !== "do-what-it-says") {
            console.log("You are accessing the data in random.txt".bold.red);
            whatDoesUserWant(userWants, param);
        } else {
            console.log("do-what-it-says not valid in random.txt".bold.red);
        }
    });
}

function outputString(string) {

    fs.appendFile('liri_output.txt', string, function(err) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
    });
}

