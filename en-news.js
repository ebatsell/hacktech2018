const request = require('request');

function getQuote() {
  return new Promise(function(resolve, reject) {
    request('http://0f28c9ce.ngrok.io/news', { json: true }, (err, res, body) => {
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
      	var articleStart = 0;
      	if (event.num) {
          articleStart = parseInt(event.num);
        }

      	for (var i = articleStart; i < articles.length; i++) {
          	const nextArticle = (i+1)
  			gather = twiml.gather({
				input: 'dtmf',
				timeout: 1,
				numDigits: 1,
				action: '/en-news?num='+nextArticle
			}).say("Your " + arr[i] + " article: " + articles[i].headline);
          	twiml.pause({length: 1});
          	gather = twiml.gather({
				input: 'dtmf',
				timeout: 1,
				numDigits: 1,
				action: '/en-news?num='+nextArticle
			}).say(articles[i].article);
          	twiml.pause({length: 2});
        }
    });
  	sleep(300).then(() => {
  		callback(null, twiml);
    });
}

exports.handler = main;
