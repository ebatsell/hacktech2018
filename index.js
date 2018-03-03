const qs = require("querystring");
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = function (context, req) {
  context.log('triggered...');

//  const formValues = qs.parse(req.body);
//  // Insert spaces between numbers to aid text-to-speech engine
//  const phoneNumber = formValues.From.replace(/\+/g, '').split('').join(' ');
//
//  const twiml = new VoiceResponse();
//  console.log("phoneNumber",phoneNumber);
//  twiml.say('Your phone number is: ' + phoneNumber);
//
//  context.res = {
//    status: 200,
//    body: twiml.toString(),
//    headers: { 'Content-Type': 'application/xml' },
//    isRaw: true
//  };
  
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech dtmf',
    timeout: 3,
    numDigits: 1,
  });
  gather.say('Please press 1 or say sales for sales.');

  console.log(response.toString());

  context.res = {
    status: 200,
    body: twiml.toString(),
    headers: { 'Content-Type': 'application/xml' },
    isRaw: true
  };
  context.done();
};