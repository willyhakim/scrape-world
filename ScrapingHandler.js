const RequestPromise = require('request-promise')
const Cheerio = require('cheerio')

const getFootballNews = () => {
    const uri = "https://www.skysports.com/football/news";

    let options = {
        uri,
        transform: function(body) {
            //Will be called when the RequestPromise resolves
            return Cheerio.load(body)
        }
    }

    return RequestPromise(options).then($ => {
        let articles = []
        $('.news-list__item').each(function(i, elem) {
            //loop on each article
            let article = {
                title: $(this).find('a.news-list__headline-link')
                    .text()
                    .trim(),
                
                image: $(this).find('img.news-list__image')
                    .attr('src'),

                date: $(this).find('span.label__timestamp')
                    .text()
                    .trim(),

                link: $(this).find('a.news-list__headline-link')
                    .attr('href'),

                smallDescription: $(this).find('.news-list__snippet')
                    .text()
                    .trim()
            }
            articles.push(article)
        })
        return articles
    })
}


module.exports = {
    getFootballNews
}