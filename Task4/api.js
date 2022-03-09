function apiGetter(apiLink, callback){
    fetch(apiLink)
    .then( (response) => {
        response.json()
        .then( (response) => {
            callback (response, false)
        } )
    })
    .catch(e=> callback(false, e.message))    
}

const newsContainer = document.querySelector('main>div.newsContainer')

apiGetter("https://newsapi.org/v2/everything?q=bitcoin&apiKey=44ad25ca0a2440b8bd052b5def0f45ee", (res, err) => {
    if (err) console.log(err)
    else {
        console.log(res.articles);
        res.articles.forEach((element) => {
            const newsArticle = elCreator(newsContainer, 'article', null,'card')
            elCreator(newsArticle, "h2", element.title)
            elCreator(newsArticle, 'h6', element.source.name, null)
            let attributes = [
                { atrrName: 'src', atrrVal:element.urlToImage}
            ]
            elCreator(newsArticle, 'img', null,null, attributes)
            elCreator(newsArticle, 'p', element.description);
        })
    }
})

function elCreator (parent, elementType, txt, classes,attributes=[]) {
    const newEl = document.createElement(elementType)
    parent.appendChild(newEl)
    if (txt) newEl.innerText = txt;
    if (classes) newEl.className = classes;
    if (attributes) attributes.forEach(atrr => {
        newEl.setAttribute(atrr.atrrName, atrr.atrrVal)
    })
    return newEl;
}


// Sample for the News Object 
//{
//     "source": {
//         "id": null,
//         "name": "Lifehacker.com"
//     },
//     "author": "Jeff Somers",
//     "title": "Is the Crypto Bubble Going to Burst?",
//     "description": "Even if you aren’t paying attention to Bitcoin and other cryptocurrencies, you might have noticed that their value plummeted last week, with the total value of the market tumbling from a high of $3 trillion last year to about $1.5 trillion in a matter of days…",
//     "url": "https://lifehacker.com/is-the-crypto-bubble-going-to-burst-1848475768",
//     "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/976a59b09e0e681e692bd7517498e3f2.jpg",
//     "publishedAt": "2022-02-09T16:00:00Z",
//     "content": "Even if you arent paying attention to Bitcoin and other cryptocurrencies, you might have noticed that their value plummeted last week, with the total value of the market tumbling from a high of $3 tr… [+4782 chars]"
// }