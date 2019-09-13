var keyword = "javascript";
var queryURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow" + "&intitle=" + keyword;

console.log('url', queryURL);



// Creating an AJAX call for the specific GIF button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log('response', response); 
    for (var i = 0; i < 4; i++) {
    var keywordURL = response.items[i].link;
    console.log('keyword', keywordURL);
    $('KEYWORD-FORM'[i]).text(keywordURL[i])
    }

    
    
})