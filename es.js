exports.handler = function(context, event, callback) {
	const twiml = new Twilio.twiml.VoiceResponse();
  	twiml.say("Hola mundo", {language: 'es'});

  	callback(null, twiml);
};
