exports.handler = function(context, event, callback) {  
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        twiml.say('Vous écoutez maintenant des nouvelles. Appuyez sur n\'importe quelle touche pour ignorer l\'article en cours.', {language: 'fr'});
        twiml.redirect('/fr-news');
        break;
      case '2':
        twiml.say('Vous êtes en train d\'écouter du sport.', {language: 'fr'});
        twiml.redirect('/fr-sports');
        break;
      default:
        twiml.say("Désolé, je ne comprends pas ce choix.");
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
