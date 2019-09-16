

$("#click-button").on("click", function(event) {
event.preventDefault();
var keyword = $("#keyword-input").val();
var queryURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow" + "&intitle=" + keyword;

console.log('url', queryURL);



// Creating an AJAX call for the specific GIF button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    for (var i = 0; i < 4; i++) {
    var keywordURL = response.items[i].link;
    var keywordTitle = response.items[i].title;

    console.log('keyword', keywordTitle);
    console.log('keyword', keywordURL);
    }

    
    
})
})