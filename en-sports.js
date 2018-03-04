const request = require('request');

function getQuote() {
  return new Promise(function(resolve, reject) {
    request('http://0f28c9ce.ngrok.io/replay', { json: true }, (err, res, body) => {
      	resolve(body.events);
	});
  });
}
function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));  
}
const main = function (context, event, callback) {
	const twiml = new Twilio.twiml.VoiceResponse();
  	// live = true, recap = false
  	const liveOrRecap = false;
  	var games, randomGame;
  	if (liveOrRecap == true) {
      games = [ [490448, "Valencia", "Real Betis"],
			  	[491421, "AC Milan", "Inter Milan"],
              	[492139, "Cremonese", "Venezia FC"]
			  ];
      randomGame = Math.floor(Math.random() * games.length);
      console.log(games[randomGame][1] + " versus " + games[randomGame][2] + ", can be found at http://www.espn.com/soccer/match?gameId=" + games[randomGame][0]);
    }
    else {
      games = [ [480619, "Burnley", "Everton"],
			  	[480617, "Leicester City", "Bournemouth"],
			  	[480623, "Southampton", "Stoke City"],
			  	[480625, "Swansea City", "West Hame United"],
			  	[480620, "Tottenham Hotspurs", "Huddersfield Town"],
			  	[480624, "Watford", "West Bromwich Albion"],
			  	[480622, "Liverpool", "Newcastle"]
			  ];
      randomGame = Math.floor(Math.random() * games.length);
      console.log(games[randomGame][1] + " versus " + games[randomGame][2] + ", can be found at http://www.espn.com/soccer/match?gameId=" + games[randomGame][0]);
      
      
      
      	getQuote().then((events) => {
      		for (var i = events.length - 1; i >= 0; i--) {
  				twiml.say(events[i].time + " minutes");
          		twiml.pause({length: 1});
          		twiml.say(events[i].detail);
          		twiml.pause({length: 2});
        	}
    	});
    }
  
  	sleep(300).then(() => {
  		callback(null, twiml);
    });
}

exports.handler = main;

/*
// Link: http://www.espn.com/soccer/match?gameId=...

// games starting at noon
var games = [ [490448, "Valencia", "Real Betis"],
			  [491421, "AC Milan", "Inter Milan"],
              [492139, "Cremonese", "Venezia FC"]
			];

// games starting at 2pm
var games = [ [502740, "Seattle Sounders", "Los Angeles FC"],
              [502739, "Vancouver Whitecaps", "Montreal Impact"]
			];

// games from yesterday
var games = [ [480619, "Burnley", "Everton"],
			  [480617, "Leicester City", "Bournemouth"],
			  [480623, "Southampton", "Stoke City"],
			  [480625, "Swansea City", "West Hame United"],
			  [480620, "Tottenham Hotspurs", "Huddersfield Town"],
			  [480624, "Watford", "West Bromwich Albion"],
			  [480622, "Liverpool", "Newcastle"]
			];

*/
