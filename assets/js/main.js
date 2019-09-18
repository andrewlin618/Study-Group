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
    if ($(this).attr('aria-expanded')==='true'){
        $(this).html('&nbsp&nbsp&nbsp&nbsp&nbsp▲&nbsp&nbsp&nbsp&nbsp&nbsp');
    } else{
        $(this).text('more ▼');
    }
})

// ============================= Creat Button ==============================

//Create a new study group:
$(document).on('click', '#create-btn', function () {
    if (username !== null) {
        $("#create-card").fadeIn();
        $('#create-btn').hide();
    }
})

//Cancel creating study group:
$(document).on('click', '#cancel-btn', function (event) {
    event.preventDefault();
    $("#create-card").fadeOut();
    $('#create-btn').show();
})

$(document).on('click', '#clear-btn', function (event) {
    event.preventDefault();
    clearForm();
})

//Confirm creating study group:
// $(document).on('click', "#submit-btn", function () {
//     console.log('hello:' + $('#topic-input').val());
//     if ($('#topic-input').val() === ""){
//         alert("Please add discussion topic");
//         return;
//     }
//     if ($('#location-input').val() === ""){
//         alert("Please add location");
//         return;
//     }
//     if ($('#date-input').val() === ""){
//         alert("Please add date");
//         return;
//     }
//     if ($('#start-time-input').val() === ""){
//         alert("Please add start time");
//         return;
//     }
    
//     $("#create-card").fadeOut();
//     $('#create-btn').show();
// })
