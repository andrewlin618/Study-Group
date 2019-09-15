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
    $('#name-shortcut').text(localStorage.getItem('username-shortcut'))
    console.log(username, usernameShortcut, userCategory, userDifficulty, userLocationPreference);
}

function logOut() {
    if( username === null){
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
}


function saveThisGroup(studyGroup){
// TODO: Save studyGroup Object to Firebase 
}

function printThisGroup(studyGroup){





}