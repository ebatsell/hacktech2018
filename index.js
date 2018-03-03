exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  twiml.gather({
    input: 'speech',
    timeout: 3,
  }).say({loop:0,voice:'alice'},'Welcome to Hacktech 2018. Please list your symptoms...');
 
  callback(null, twiml);
};
