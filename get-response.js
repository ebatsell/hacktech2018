exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        twiml.say('You selected English.', {language: 'en'});
        twiml.redirect('/en');
        break;
      case '2':
        twiml.say('Has seleccionado Español.', {language: 'es'});
        twiml.redirect('/es');
        break;
      case '3':
        twiml.say('vous avez sélectionné Français.', {language: 'fr'});
        twiml.redirect('/fr');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.");
        twiml.pause({length:2});
        twiml.redirect('/main');
        break;
    }
  } else {
    twiml.redirect('/main');
  }
  
  callback(null, twiml);
};

