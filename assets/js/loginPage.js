var username = localStorage.getItem('username');
var usernameShortcut = localStorage.getItem('username-shortcut');
var userCategory = localStorage.getItem('user-category');
var userDifficulty = localStorage.getItem('user-difficulty');
var userLocationPreference = localStorage.getItem('user-location-preference');


// ============================================================================
// Check log in status
// if logged in already
if (localStorage.getItem('username') !== null) {
    launchMainPage();
    // if not
} else {
    launchLoginPage();
}

//Storage name to localStorage
$(document).on('click', '.name-list', function () {
    username = $(this).text();
    usernameShortcut = username[0];
    for (var i = 0; i < username.length; i++) {
        if (username[i] === " ") {
            usernameShortcut = usernameShortcut + username[i + 1];
        }
    }
    localStorage.setItem("username", username);
    localStorage.setItem("username-shortcut", usernameShortcut);
    $("#log-in-text").text("logging…")
    $("#log-in-btn").text(username);
    setTimeout(function () {
        launchMainPage();
    }, 2500)
});

$(document).on('click', '#log-out', function () {
    logOut();
    $('#navbar-btn').addClass('collapsed')
    $('#navbar-btn').attr('aria-expanded', "false")
    $('#navbarNav').removeClass('show');
    setTimeout
    setTimeout(function () {
        launchLoginPage();
    }, 2500)
})

$(document).on('click','#create-btn',function () {
    if (username !== null) {
        $("#create-card").fadeIn();
    }
})

$(document).on('click','#cancel-btn',function () {
    $("#create-card").fadeOut();
})

$(document).on('click',"#submit-btn",function () {
    var studyGroup = {
        creator: username,
        category: $('#category-input').val(),
        difficulty: $('#difficulty-input').val(),
        capacity: $('#capacity-input').val(),
        topic: $('#topic-input').val(),
        location: $('#location-input').val(),
        date: $('#date-input').val(),
        time: $('#time-input').val(),
        questions: ['API1:apple pen pineapple pen', 'API2:apple pen pineapple pen', 'API3:apple pen pineapple pen', 'API4:apple pen pineapple pen', 'API5:apple pen pineapple pen', ],
        books: ['Book1: Hello World', 'Book2: Hello World', 'Book3: Hello World', 'Book4: Hello World', 'Book5: Hello World']
    }
    console.log

    // TODO: Save studyGroup Object to Firebase ,check basicFunctions.js
    saveThisGroup(studyGroup);

    // This can be replaced by firebase snapshot
    printThisGroup(studyGroup);
    
    $("#create-card").fadeOut();
})