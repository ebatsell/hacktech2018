from flask import Flask, request, jsonify
import requests
app = Flask(__name__)


@app.route('/news', methods=['GET'])
def news_test():
    response = {
      "articles": [
        {
          "article": " The anti-establishment 5-Star Movement looks set to be the biggest single party, feeding off discontent over entrenched corruption and growing poverty, while the ruling centre-left Democratic Party is seen limping home in third place. Heavily indebted Italy is the third largest economy in the 19-member euro zone and although investors have been sanguine ahead of the ballot, prolonged political stalemate could reawaken the threat of market instability. Populist parties have been on the rise across Europe since the 2008 financial crisis, but mainstream parties in Italy have found it especially hard to contain voter anger, with the economy still some six percent smaller than a decade ago and unemployment stuck at around 11 percent. Although all party leaders have ruled out any post-election alliances with rivals, Italy has a long history of finding a way out of apparently intractable political stalemate.", 
          "headline": "Italy heads to polls with centre-right ahead but stalemate likely"
        }, 
        {
          "article": " Hundreds of thousands of Americans were without power Saturday and at least nine deaths were said to be related to a Nor'easter that thrashed the East Coast with heavy winds, rain and snow on Friday. Newport Police in Rhode Island reported a man in his 70s died when he was struck by a wind-felled tree and Baltimore Public Safety said a 77-year-old woman was killed by a large tree branch that dropped from a tree above her. Though the powerful winds and rain from Georgia to New England caused heavy flooding and flight cancellations Friday, the National Weather Service reported improving conditions \"Across the Northeast and northern Mid-Atlantic states\" for the weekend. Two of the vessel ran aground on the New Jersey side of the river, one sank near the Yonkers Sewer Treatment Plant and a number of commercial tugboats, the U.S. Coast Guard and the New York City Fire Department worked to secure the fourth barge, Parkway Police reported.", 
          "headline": "Powerful storm leaves 9 dead, swaths of East Coast in the dark"
        }, 
        {
          "article": " WASHINGTON - U.S. President Donald Trump praised Chinese President Xi Jinping Saturday after the ruling Communist party announced it was eliminating the two-term limit for the presidency, paving the way for Xi to serve indefinitely, according to audio aired by CNN. \"He's now president for life, president for life. And he's great,\" Trump said, according to audio of excerpts of Trump's remarks at a closed-door fundraiser in Florida aired by CNN. \"And look, he was able to do that. I think it's great. Maybe we'll have to give that a shot someday,\" Trump said to cheers and applause from supporters. U.S. Representative Ro Khanna, a Democrat, said on Twitter that \"Whether this was a joke or not, talking about being President for life like Xi Jinping is the most unAmerican sentiment expressed by an American President. George Washington would roll over in his grave.\" During the remarks, Trump praised Xi as \"a great gentleman\" and added: \"He's the most powerful president in a hundred years.\" Trump said Xi had treated him \"Tremendously well\" during his visit in November. Trump has often praised Xi, but in January Trump told Reuters the United States was considering a big \"Fine\" as part of a probe into China's alleged theft of intellectual property.", 
          "headline": "Trump Praises Chinese President For Extending Tenure 'For Life'"
        }, 
        {
          "article": " During a news conference Saturday morning in Michigan, university police Chief Bill Yeagley told reporters that Davis' parents had just picked him up from the hospital and brought him to his dorm to pack up for spring break when Friday's shooting occurred. On Thursday, a day before the shooting, CMU police encountered Davis Jr. when he came running into a community police office in his dorm \"Very frightened\" and \"Not making a lot of sense.\" When officers tried to talk to him, he again wasn't making sense, Yeagley said, adding that the student was acting \"In a fashion that isn't reasonable or logical.\" They asked Davis Jr. to call his parents, which he did. Video footage showed Davis Jr. in the dorm's parking lot with the gun before he entered the residence hall where his parents were shot around 8:30 a.m., authorities said.", 
          "headline": "Cops: Student acted erratically day before he killed his parents at Central Michigan University"
        }, 
        {
          "article": " The Powerball jackpot has climbed to $321 million for Saturday night's lottery drawing. The winning numbers for Saturday's drawing were: 40, 17, 36, 25, 13 and 05 with a Power Play of X2. The cash option for the 10:59 p.m. drawing was $189 million. Three winning tickets were sold for that drawing, including one in bought in New Jersey by Englishtown couple Jorge and Joanne Lopes. In New Jersey, the best anyone did in the last drawing was to match four numbers and win $500. The jackpot has climbed in the seven weeks since a New Hampshire woman won a $559.7 million jackpot on Jan. 6.", 
          "headline": "Powerball winning numbers, live lottery results for Saturday (3/3/18) $321M drawing"
        }
      ]
    }

    return jsonify(response), 200

# Simple test endpoint to simply get 
@app.route('/news_real', methods=['GET'])
def news():

    # GET new articles https://newsapi.org/docs/endpoints/top-headlines
    article_json = requests.get(
        'https://newsapi.org/v2/top-headlines',
        params={'apiKey':'e22c6f77ebbb4889a301424ae10c7fad','pageSize':5,'country':'us'}).json()


    # Seperate into URL and headline
    urls = []
    headlines = []
    for ar in article_json['articles']:
        urls.append(ar['url'])
        headlines.append(ar['title'])

    # Send URLs to SMMRY
    summaries = []
    for url in urls:
        summary_json = requests.get('http://api.smmry.com/', params={'SM_API_KEY':'C016AF449A','SM_LENGTH':4,'SM_URL': url}).json() 
        if 'sm_api_error' in summary_json:
            summaries.append('No article summary is available.')
        else:
            summaries.append(summary_json['sm_api_content'])

    # Create articles list
    articles = []
    for i in range(len(article_json['articles'])):
        articles.append({'article': summaries[i], 'headline': headlines[i]})

    json_data = {}

    json_data['articles'] = articles

    return jsonify(json_data), 200


@app.route('/live', methods=['GET'])
def live_match():
    # Use web scraping tools to get most recent post
    # Twilio will be calling this on a loop, and when something changes it will read out what happened


    req = requests.get()
    return jsonify({}), 200


# Old method used for example syntax
@app.route('/user', methods=['GET', 'POST'])
def tweet_analysis():
    json_data = request.get_json()

    if not json_data and 'user_id' not in json_data.keys():
        return jsonify({'error': 'Bad User Params'}), 400

    tweet_value = get_tweets(json_data['user_id'])

    pi_data = WatsonHandler().profile_data(tweet_value) 
    json_data['personality_data'] = pi_data

    # getConcepts(json_data['user_id'])
    nlp_data = WatsonHandler().nlu(tweet_value)


    # Compute 5 emotion values 
    emotions = compute_emotions(nlp_data)

    # Improve this heuristic if time
    inappropriate_emotion_heuristic = (emotions['anger'] + emotions['disgust']) / 2
    contains_profanity = profanity.contains_profanity(tweet_value)
    profanity_value = random.uniform(0.0, 0.1)
    if contains_profanity:
        profanity_value += .9

    inappropriate_spectrum = max(inappropriate_emotion_heuristic, profanity_value)

    clickbaitiness = 0
    try:
        originality = requests.get('http://127.0.0.1:5001/detect', params={'headline': tweet_value}).json()
        clickbaitiness = float(originality['clickbaitiness'])
    except:
        clickbaitiness = .1


    json_data['inappropriateness'] = inappropriate_spectrum
    json_data['clickbaitiness'] = clickbaitiness

    return jsonify(json_data), 200


if __name__ == '__main__':
    app.run(debug=True)
