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
  }).say('Presione, 2, para Español', {language: 'es'});
  
  gather = twiml.gather({
    input: 'dtmf',
    timeout: 1,
    numDigits: 1,
    action: '/get-response'
  }).say('Appuyez sur, 3, pour le Français', {language: 'fr'});
  
  twiml.redirect('/main');
  
  callback(null, twiml);
};
