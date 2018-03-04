const request = require('request');

function getQuote() {
  return new Promise(function(resolve, reject) {
    request('http://fa381518.ngrok.io/news', { json: true }, (err, res, body) => {
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
      	var arr = ["premier", "deuxième", "troisième", "quatrième", "cinquième"];
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
				action: '/fr-news?num='+nextArticle
			}).say("Votre " + arr[i] + " article: " + articles[i].headline, {language: "fr"});
          	twiml.pause({length: 1});
          	gather = twiml.gather({
				input: 'dtmf',
				timeout: 1,
				numDigits: 1,
				action: '/fr-news?num='+nextArticle
			}).say(articles[i].article, {language: "fr"});
          	twiml.pause({length: 2});
        }
    });
  	sleep(300).then(() => {
  		callback(null, twiml);
    });
}

exports.handler = main;
