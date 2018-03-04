import scrapy


class GameSpider(scrapy.Spider):
    name = "game_spider"

    def start_requests(self):
        base_url = 'http://www.espn.com/soccer/commentary?gameId=' #491423

        f = open("ids.txt","r") #opens file with name of "test.txt"
        match_id =f.readline()
        yield scrapy.Request(url=base_url + match_id, callback=self.parse)

    def parse(self, response):
        #Extracting the content using css selectors
        commentary = response.css('div.accordion.active')
        times = commentary.css('td.time-stamp::text').extract()
        details = commentary.css('td.game-details::text').extract()

        #Give the extracted content row wise
        for item in zip(times,details):
            #create a dictionary to store the scraped info
            scraped_info = {
                'time' : item[0],
                'detail' : item[1],
            }

            #yield or give the scraped info to scrapy
            yield scraped_info
