var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

console.log('this is loaded');

var twitterKeys = {
  consumer_key: 'Ps6gO46pzJhE9wePw5t8HR9wP',
  consumer_secret: 'OP8jDykkg0cxWVrfHdKd8Rth6TzqhApnMyrXA4YTAXyumIQZgc',
  access_token_key: '923714979588595714-yBLAQHsBaeOeCHOt83x6WawjWFle1aB',
  access_token_secret: 'bWcW8ZNUxpi4c3g7DuvErj6LtvsUgb9gGQ5yD1AcEgzrC',
}

var clientSpotify = Spotify({
	id: 'd5b8a70b03204a6f9909f84c9c337f4f',
	secret: '9cda41ccd56047b8b220b1270b3de7ce',
});

module.exports = twitterKeys;
module.exports = clientSpotify;