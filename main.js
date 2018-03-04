exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  
  gather = twiml.gather({
    input: 'dtmf',
    timeout: 1,
    numDigits: 1,
    action: '/get-response'
  }).say('Welcome to Hacktech 2018. Press ,1, for English,', {language: 'en'});
  
  gather = twiml.gather({
    input: 'dtmf',
    timeout: 1,
    numDigits: 1,
    action: '/get-response'
  }).say('Press ,2, for Español,', {language: 'es'});
  
  gather = twiml.gather({
    input: 'dtmf',
    timeout: 1,
    numDigits: 1,
    action: '/get-response'
  }).say('Press ,3, for Français,', {language: 'fr'});
  
  gather = twiml.gather({
    input: 'dtmf',
    timeout: 1,
    numDigits: 1,
    action: '/get-response'
  }).say('Press 0 at any time to hang up.', {language: 'en'});
  
  twiml.redirect('/main');
  
  callback(null, twiml);
};
