exports.handler = function(context, event, callback) {
	const twiml = new Twilio.twiml.VoiceResponse();
  	twiml.say('Salut tout le monde', {language: 'fr'});

  	callback(null, twiml);
};
