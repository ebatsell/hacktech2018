exports.handler = function(context, event, callback) {  
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        gather = twiml.gather({
			input: 'dtmf',
			timeout: 1,
			numDigits: 1,
			action: '/en'
		}).say('You selected English. Press ,1, to listen to news or, press ,2, to listen to sports.', {language: 'en'});
        twiml.pause({length:2});
        twiml.redirect('/main');
        break;
      case '2':
        gather = twiml.gather({
			input: 'dtmf',
			timeout: 1,
			numDigits: 1,
			action: '/es'
		}).say('Has seleccionado Español. Presione ,1, para escuchar noticias o, presione ,2, para escuchar deportes.', {language: 'es'});
        twiml.pause({length:2});
        twiml.redirect('/main');
        break;
      case '3':
        gather = twiml.gather({
			input: 'dtmf',
			timeout: 1,
			numDigits: 1,
			action: '/fr'
		}).say('Vous avez sélectionné Français. Appuyez sur ,1, pour écouter les nouvelles ou appuyez sur ,2, pour écouter les sports.', {language: 'fr'});
        twiml.pause({length:2});
        twiml.redirect('/main');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.");
        twiml.pause({length:2});
        twiml.redirect('/main');
        break;
    }
  }
  twiml.redirect('/main');
  
  callback(null, twiml);
};

