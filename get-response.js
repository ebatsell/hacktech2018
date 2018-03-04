exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        twiml.say('You selected English.');
        break;
      case '2':
        twiml.say('You selected Spanish.');
        break;
      case '3':
        twiml.say('You selected French.');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.").pause();
        twiml.redirect('/main');
        break;
    }
  } else {
    // If no input was sent, redirect to the main menu
    twiml.redirect('/main');
  }
  //twiml.say(`You said ${command}.`);
  
  callback(null, twiml);
};
