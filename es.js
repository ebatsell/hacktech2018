exports.handler = function(context, event, callback) {  
  const twiml = new Twilio.twiml.VoiceResponse();
 
  if (event.Digits) {
    switch (event.Digits) {
      case '1':
        twiml.say('Ahora estás escuchando noticias. Presione cualquier tecla para omitir el artículo actual.', {language: 'es'});
        twiml.redirect('/es-news');
        break;
      case '2':
        twiml.say('Ahora estás escuchando deportes.', {language: 'es'});
        twiml.redirect('/es-sports');
        break;
      default:
        twiml.say("Lo siento, no entiendo esa elección.");
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
