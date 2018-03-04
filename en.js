exports.handler = function(context, event, callback) {  
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        twiml.say('You are now listening to news. Press any key to skip the current article.', {language: 'en'});
        twiml.redirect('/en-news');
        break;
      case '2':
        twiml.say('You are now listening to sports.', {language: 'en'});
        twiml.redirect('/en-sports');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.");
        twiml.pause({length:2});
        twiml.redirect('/get-response');
        break;
    }
  }
  else {
    twiml.redirect('/get-response');
  }
  
  callback(null, twiml);
};
