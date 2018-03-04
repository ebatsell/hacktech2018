exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  const gather = twiml.gather({
    input: 'dtmf',
    timeout: 3,
    numDigits: 1,
    action: '/get-response'
  }).say('Welcome to Hacktech 2018. Press ,1, for English,', {language: 'en'});
  
  twiml.say('Welcome to Hacktech 2018. Press ,1, for English,', {language: 'en'});
  twiml.say('Press ,2, for Español,', {language: 'es'});
  twiml.say('or press ,3, for Français,', {language: 'fr'});
  twiml.say('Press 0 at any time to hang up.', {language: 'en'});
  
  //twiml.say(gather);
 
  callback(null, twiml);
};
