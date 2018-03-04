import scrapy


class GameSpider(scrapy.Spider):
    name = "game_spider"

    def start_requests(self):
        urls = [
            'http://www.espn.com/soccer/commentary?gameId=491423'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        #Extracting the content using css selectors
        times = response.css('td.time-stamp::text').extract()
        details = response.css('td.game-details::text').extract()

        #Give the extracted content row wise
        for item in zip(times,details):
            #create a dictionary to store the scraped info
            scraped_info = {
                'time' : item[0],
                'detail' : item[1],
            }

            #yield or give the scraped info to scrapy
            yield scraped_info
