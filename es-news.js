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
  	var MsTranslator = require('mstranslator');
	var client = new MsTranslator({api_key: "987f979870b7425f92f9a041b1fbadaa"}, true);
 
  	getQuote().then((articles) => {
      	var arr = ["primer", "segundo", "tercer", "cuarto", "quinto"];
      	var articleStart = 0;
      	if (event.num) {
          articleStart = parseInt(event.num);
        }

      	for (var i = articleStart; i < articles.length; i++) {
          	var translatedHeadline, translatedArticle;
          	console.log("Original Headline: " + articles[i].headline);
          	console.log("Original Article: " + articles[i].article);
          
          
			client.translate({text: articles[i].headline, from: 'en', to: 'es'}, function(err, data) {
				translatedHeadline = data;
			});
          	client.translate({text: articles[i].article, from: 'en', to: 'es'}, function(err, data) {
				translatedArticle = data;
			});
          
          	console.log("Translated Headline: " + translatedHeadline);
          	console.log("Translated Article: " + translatedArticle);
          
          	const nextArticle = (i+1)
  			gather = twiml.gather({
				input: 'dtmf',
				timeout: 1,
				numDigits: 1,
				action: '/es-news?num='+nextArticle
			}).say("Tu " + arr[i] + " artículo: " + translatedHeadline, {language: "es"});
          	twiml.pause({length: 1});
          	gather = twiml.gather({
				input: 'dtmf',
				timeout: 1,
				numDigits: 1,
				action: '/es-news?num='+nextArticle
			}).say(translatedArticle, {language: "es"});
          	twiml.pause({length: 2});
        }
    });
  	sleep(300).then(() => {
  		callback(null, twiml);
    });
}

exports.handler = main;
