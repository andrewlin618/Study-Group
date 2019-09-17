var username = localStorage.getItem('username');
var usernameShortcut = localStorage.getItem('username-shortcut');
var userCategory = localStorage.getItem('user-category');
var userDifficulty = localStorage.getItem('user-difficulty');
var userLocationPreference = localStorage.getItem('user-location-preference');


// ============================ Lgin page=============================
// Check log in status:
if (localStorage.getItem('username') !== null) {
    logIn();
    launchMainPage();
} else {
    launchLoginPage();
}

//Storage name to localStorage and log in:
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
        logIn();
        launchMainPage();
    }, 2500)
});

//Log out
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

// ============================= Navbar ==============================
//Set category, difficulty, location preference:
$('#category-select').on('change', function () {
    localStorage.setItem('user-category-select', $(this).val());
});
$('#difficulty-select').on('change', function () {
    localStorage.setItem('user-difficulty-select', $(this).val());
});
$('#location-select').on('change', function () {
    localStorage.setItem('user-location-select', $(this).val());
});

// ============================= Main page ==============================

$(document).on('click', '.expand-btn', function () {
    if ($(this).attr('aria-expanded') === 'true') {
        $(this).html('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp▲&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
    } else {
        $(this).text('learn more');
    }
})

// ============================= Creat Button ==============================

//Create a new study group:
$(document).on('click', '#create-btn', function () {
    if (username !== null) {
        $("#create-card").fadeIn();
    }
})

//Cancel creating study group:
$(document).on('click', '#cancel-btn', function () {
    $("#create-card").fadeOut();
})

//Confirm creating study group:
$(document).on('click', "#submit-btn", function () {
    var studyGroup = {
        'group-id': 'dynamic',
        'creator': username,
        'category': $('#category-input').val(),
        'difficulty': $('#difficulty-input').val(),
        'capacity': $('#capacity-input').val(),
        'topic': $('#topic-input').val(),
        'location': $('#location-input').val(),
        'date': $('#date-input').val(),
        'time': $('#time-input').val(),
        'questions': ['API1:apple pen pineapple pen', 'API2:apple pen pineapple pen', 'API3:apple pen pineapple pen', 'API4:apple pen pineapple pen', 'API5:apple pen pineapple pen',],
        'books': ['Book1: Hello World', 'Book2: Hello World', 'Book3: Hello World', 'Book4: Hello World', 'Book5: Hello World']
    }

    // TODO: Save studyGroup Object to Firebase ,check basicFunctions.js
    saveThisGroup();

    // This can be replaced by firebase snapshot
    printThisGroup(studyGroup);

    $("#create-card").fadeOut();
})
