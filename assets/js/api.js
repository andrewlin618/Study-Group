

$("#click-button").on("click", function(event) {
event.preventDefault();
var keyword = $("#keyword-input").val();
var queryURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow" + "&intitle=" + keyword;

// Variables for the BOOK API
// -------------------------------//
var bibkeys = 0;
var urlIBN = "http://openlibrary.org/search.json?title=" + keyword;
var urlLinks = "https://openlibrary.org/api/books?format=json&bibkeys=";
var bookImg;
var info_url;
// -------------------------------//
// -------------------------------//


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

// -------------------------------//
// -------------------------------//
// CALLING THE BOOKS API

// To get the ibn keys
function callBooksAPI(){
$.ajax({
    url: urlIBN,
    method: "GET"
}).then(function (response) {
    bibkeys= JSON.parse(response).docs[0].isbn[0]; 
    $.ajax({
        url:urlLinks+bibkeys,
        method:"GET"
    }).then(function(links){
        bookImg=links[bibkeys].preview;
        info_url=links[bibkeys].info_url;
    })
})
};
callBooksAPI();



    
    
})
})

// -------------------------------//
// -------------------------------//
