exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  const command = event.SpeechResult.toLowerCase();
  twiml.say(`You said ${command}.`);
  
  callback(null, twiml);
};

