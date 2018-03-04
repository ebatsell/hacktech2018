exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  twiml.gather({
    input: 'speech',
    timeout: 3,
    action: '/get-response'
  }).say('Welcome to Hacktech 2018. Please list your symptoms.');
  
 
  callback(null, twiml);
};
