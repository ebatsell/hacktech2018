const request = require('request');

function getQuote() {
  return new Promise(function(resolve, reject) {
    request('http://fa381518.ngrok.io/news?a=c', { json: true }, (err, res, body) => {
      	resolve(body.articles);
	});
  });
}
function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));  
}
const main = function (context, event, callback) {
	const twiml = new Twilio.twiml.VoiceResponse();
  	getQuote().then((articles) => {
      	var arr = ["first", "second", "third", "fourth", "fifth"];
      	for (var i = 0; i < articles.length; i++) {
  			twiml.say("Your " + arr[i] + " article: " + articles[i].headline);
          	twiml.pause({length: 1});
          	//twiml.say(articles[i].article);
          	//twiml.pause({length: 2});
        }
    });
  	sleep(300).then(() => {
  		callback(null, twiml);
    });
}

exports.handler = main;


