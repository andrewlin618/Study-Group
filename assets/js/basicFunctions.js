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
}

function logIn() {
    $('#user-image').attr('src','assets/images/andrew-lin.png');
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
    $('#user-image').attr('src','assets/images/icon.png');
    $('#category-select').val('Category');
    $('#difficulty-select').val('Difficulty');
    $('#location-select').val('Location');
}

// TODO: Save studyGroup Object to Firebase 
function saveThisGroup(studyGroup) {
    localStorage.setItem('studyGroup1', studyGroup);
}

function printThisGroup(studyGroup) {
    var studyGroupDiv

}

$(".time-information").on("click",function(){
    alert('add to calender~~~');
});


$(".location-information").on('click',function(){
    alert('navigation~~~');
})