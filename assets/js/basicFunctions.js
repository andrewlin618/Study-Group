function launchLoginPage() {
    $("#log-in-text").text("log in")
    $("#log-in-btn").text("Choose your name");
    $('#space-holder').show();
    $('#log-in-page').show();
    $('#main-page').hide();
    // generate list
    for (var i = 0; i < studentBank.length; i++) {
        var newDiv = new $('<a>');
        newDiv.addClass('dropdown-item name-list');
        newDiv.text(studentBank[i]);
        $("#log-in-list").append(newDiv);
    }
    var newDiv = new $('<a>');
    newDiv.addClass('dropdown-item name-list');
    newDiv.text("I am not in the class");
    $("#log-in-list").append(newDiv);
}

function launchMainPage() {
    $('#space-holder').hide();
    $('#log-in-page').hide();
    $('#main-page').show();
    $('#main-page').empty();
    retrievingData();
}

function logIn() {

    $('#user-image').attr('src', 'assets/images/' + username.replace(' ', '-') + '.png');
    $('#name-shortcut').text(localStorage.getItem('username-shortcut'));
    if (localStorage.getItem('user-category-select')) {
        $('#category-select').val(localStorage.getItem('user-category-select'));
    }
    if (localStorage.getItem('user-difficulty-select')) {
        $('#difficulty-select').val(localStorage.getItem('user-difficulty-select'));
    }
    if (localStorage.getItem('user-location-select')) {
        $('#location-select').val(localStorage.getItem('user-location-select'));
    }
}

function logOut() {
    if (username === null) {
        return;
    }
    username = null;
    usernameShortcut = null;
    userCategory = null;
    userDifficulty = null;
    userLocationPreference = null;
    localStorage.clear();
    $('#main-page').hide();
    $('#space-holder').show();
    $('#log-in-page').show();
    $("#log-in-text").text("logging out…")
    $('#name-shortcut').html('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
    $('#user-image').attr('src', 'assets/images/icon.png');
    $('#category-select').val('Category');
    $('#difficulty-select').val('Difficulty');
    $('#location-select').val('Location');
}

function dateShorten(timeEntire) {
    var d = new Date();
    var n = d.getFullYear();
    if (timeEntire.substr(0, 4) == n) {
        timeEntire = timeEntire.slice(5);
    }
    switch (timeEntire.slice(0, 3)) {
        case '01-':
            timeEntire = 'Jan ' + timeEntire.slice(3);
            break;
        case '02-':
            timeEntire = 'Feb ' + timeEntire.slice(3);
            break;
        case '03-':
            timeEntire = 'Mar ' + timeEntire.slice(3);
            break;
        case '04-':
            timeEntire = 'Apr ' + timeEntire.slice(3);
            break;
        case '05-':
            timeEntire = 'May ' + timeEntire.slice(3);
            break;
        case '06-':
            timeEntire = 'June ' + timeEntire.slice(3);
            break;
        case '07-':
            timeEntire = 'July ' + timeEntire.slice(3);
            break;
        case '08-':
            timeEntire = 'Aug ' + timeEntire.slice(3);
            break;
        case '09-':
            timeEntire = 'Sep ' + timeEntire.slice(3);
            break;
        case '10-':
            timeEntire = 'Oct ' + timeEntire.slice(3);
            break;
        case '11-':
            timeEntire = 'Nov ' + timeEntire.slice(3);
            break;
        case '12-':
            timeEntire = 'Dec ' + timeEntire.slice(3);
            break;
    }
    return timeEntire;
}

function clearForm() {
    $('#category-input').val('General');
    $('#difficulty-input').val('Recommended');
    $('#capacity-input').val('No limit');
    $('#topic-input').val('');
    $('#location-input').val('');
    $('#date-input').val('');
    $('#start-time-input').val('');
    $('#end-time-input').val('');
}

function validation() {
    if ($('#topic-input').val() === "") {
        alert("Please add discussion topic");
        return false;
    }
    if ($('#location-input').val() === "") {
        alert("Please add location");
        return false;
    }
    if ($('#date-input').val() === "") {
        alert("Please add date");
        return false;
    }
    if ($('#start-time-input').val() === "") {
        alert("Please add start time");
        return false;
    }
    return true;
}

$(".time-information").on("click", function () {
    alert('add to calender~~~');
});


$(".location-information").on('click', function () {
    alert('navigation~~~');
})