var keyword;
var urlStack;
var questionsArray = [];
// Variables for the BOOK API
// -------------------------------//
var bibkeys = [];
var urlIBN;
var urlLinks = "https://openlibrary.org/api/books?format=json&bibkeys=";
var booksArray = [];
var publishers = [];
// -------------------------------//
// -------------------------------//



$("#topic-btn").on('click', function () {
    keyword = $("#topic-input").val();
    urlStack = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow" + "&intitle=" + keyword;
    urlIBN = "http://openlibrary.org/search.json?title=" + keyword;
    event.preventDefault();
    $("#questions-show-here").empty();
    $("#books-show-here").empty();
    questionsArray = [];
    booksArray = [];
    bibkeys = [];
    callBooksAPI();
    callStackAPI();
});

// Calling the stacks ApI to get the questions
function callStackAPI() {
    $.ajax({
        url: urlStack,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 5; i++) {
            var qstnObject = {};
            var keywordURL = "";
            var keywordTitle = "";
            qstnObject.keywordURL = response.items[i].link;
            qstnObject.keywordTitle = response.items[i].title;
            questionsArray.push(qstnObject);
        }
        showQuestions(questionsArray);
    })
};

// callStackAPI();
// callBooksAPI();

// Displays the questions on page
function showQuestions(questionsArray) {
    for (var i = 0; i < questionsArray.length; i++) {
        var newA = $("<a/>");
        var newDiv = $("<div/>");
        newDiv.attr("id", "div-" + i);
        newDiv.addClass("buttonDiv");
        newDiv.text(questionsArray[i].keywordTitle);
        newA.attr("href", questionsArray[i].keywordURL);
        newA.attr("target", "_blank");
        newA.append(newDiv);
        $("#questions-show-here").append(newA);
    }

};

// -------------------------------//
// -------------------------------//
// CALLING THE BOOKS API

// To get the ibn keys
function callBooksAPI() {
    $.ajax({
        url: urlIBN,
        method: "GET"
    }).then(function (response) {
        var bibToSearch = '';
        var length = 0;
        if (JSON.parse(response).docs.length <= 3) {
            length = JSON.parse(response).docs.length;
        }
        else {
            length = 3;
        }
        for (var i = 0; i < length; i++) {
            if (i === 0) {
                bibToSearch = (JSON.parse(response).docs[i].isbn[0]);
            }
            else {
                bibToSearch = bibToSearch + "," + (JSON.parse(response).docs[i].isbn[0]);
            }
            bibkeys.push(JSON.parse(response).docs[i].isbn[0]);
            publishers.push(JSON.parse(response).docs[i].publisher[0]);
        }
        $.ajax({
            url: urlLinks + bibToSearch,
            method: "GET"
        }).then(function (links) {
            console.log(links);
            for (var i = 0; i < bibkeys.length; i++) {
                var bookOBJ = {};
                var bookImg = "";
                var info_url = "";
                if (links[bibkeys[i]]) {
                    bookOBJ.bookImg = publishers[i];
                    bookOBJ.info_url = links[bibkeys[i]].info_url;
                    booksArray.push(bookOBJ);
                }
            }
            showBooks(booksArray);
        })
    }
    )
};

function showBooks(booksArray) {
    for (var i = 0; i < booksArray.length; i++) {
        var newA = $("<a/>");
        newA.attr("href", booksArray[i].info_url);
        newA.attr("target", "_blank");
        newA.text(booksArray[i].bookImg);
        $("#books-show-here").append(newA);
    }

};

// $("#questions-show-here").on('click', "button", function (event) {
//     event.preventDefault();
//     console.log('no refresh plz')
// })
// -------------------------------//
// -------------------------------//
