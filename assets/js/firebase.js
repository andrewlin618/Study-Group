var key = 0;
var accordionDiv;
var participantsList = [];
var capacityArray = ["No Limit", "under 5", "under 10", "under 15"];
var firebaseConfig = {
  apiKey: "AIzaSyCu102M6JFJfKsBqQDVjE-g-xjs5phBqgk",
  authDomain: "study-group-e87f4.firebaseapp.com",
  databaseURL: "https://study-group-e87f4.firebaseio.com",
  projectId: "study-group-e87f4",
  storageBucket: "",
  messagingSenderId: "864676774706",
  appId: "1:864676774706:web:81b30f57b6370946fecd2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Click Button changes what is stored in firebase
$("#submit-btn").on("click", function (event) {

  var validate = validation();
  event.preventDefault();
  if (!validate) {
    return;
  }
  $("#create-card").fadeOut();
  $('#create-btn').show();
  var grpOBJ = {};

  grpOBJ.category = $("#category-input option:selected").text();
  grpOBJ.difficulty = $("#difficulty-input option:selected").val();
  grpOBJ.capacity = $("#capacity-input option:selected").val();
  grpOBJ.topic = $("#topic-input").val();
  grpOBJ.qstns = questionsArray;
  grpOBJ.books = booksArray;
  grpOBJ.locationChoice = $("#location-input").val();
  grpOBJ.date = $("#date-input").val();
  grpOBJ.startTime = $("#start-time-input").val();
  grpOBJ.endTime = $('#end-time-input').val();
  grpOBJ.username = localStorage.getItem('username');
  grpOBJ.participants = [localStorage.getItem('username')];

  // groupArrays.push(grpOBJ);

  saveDataToDB(grpOBJ);
  // retrievingData(key);

  clearForm();
  $('#main-page').empty();
   retrievingData();
});

function saveDataToDB(grpOBJ) {
  key = grpOBJ.date.replace(/-/g, '') + grpOBJ.startTime.replace(/:/g, '') + grpOBJ.endTime.replace(/:/g, '');

  // Change what is saved in firebase
  database.ref("/groupArray").child(key).set({
    category: grpOBJ.category,
    difficulty: grpOBJ.difficulty,
    capacity: grpOBJ.capacity,
    topic: grpOBJ.topic,
    qstns: grpOBJ.qstns,
    books: grpOBJ.books,
    location: grpOBJ.locationChoice,
    date: grpOBJ.date,
    startTime: grpOBJ.startTime,
    endTime: grpOBJ.endTime,
    username: grpOBJ.username,
    participants: grpOBJ.participants
  })
}


function retrievingData() {
  // Firebase is always watching for changes to the data.
  // When changes occurs it will print them to console and html
  database.ref("/groupArray/").on("child_added", function (snapshot, prevChildKey) {

    var cardHeaderDiv = $("<div>");
    cardHeaderDiv.addClass("card-header");

    //-----------------------------
    //-----------------------------
    //For accordion Div
    accordionDiv = $('<div>');
    accordionDiv.addClass('accordion');
    learnMoreDiv = $('<div>');
    learnMoreDiv.addClass('collapse');
    learnMoreDiv.attr("id", snapshot.val().username.replace(/\s/g, "") + snapshot.key);



    // -----------------------------
    // -----------------------------
    var newImg = $("<img>");
    newImg.attr("src", "assets/images/andrew-lin.png");
    newImg.addClass("image-information creator-img float-left my-3");
    // -----------------------------
    var newDiv = $("<div>");
    newDiv.addClass("float-left m-2");
    // ------------------------------

    var newH5 = $("<h5>");
    newH5.addClass("topic-information");
    newH5.text('# ' + snapshot.val().topic);


    var newP1 = $("<p>");
    newP1.addClass("time-information");
    newP1.css("font-weight", 'bold');

    var dateEntire = snapshot.val().date
    var date = dateShorten(dateEntire);

    if (snapshot.val().endTime === '') {
      newP1.html(date + '&nbsp&nbsp&nbsp' + snapshot.val().startTime);
    } else {
      newP1.html(date + '&nbsp&nbsp&nbsp' + snapshot.val().startTime + '-' + snapshot.val().endTime);
    }

    var newP2 = $("<p>");
    newP2.addClass("location-information");
    newP2.text(snapshot.val().location);

    var newP3 = $("<p>");
    newP3.addClass("capacity-information");
    newP3.text(capacityArray[snapshot.val().capacity]);

    // -----------------------------
    newDiv.append(newH5);
    newDiv.append(newP1);
    newDiv.append(newP2);
    newDiv.append(newP3);

    // ---------------------
    var newDivBtns = $("<div>");
    newDivBtns.addClass("float-right m-2");
    newDivBtns.attr("style", "text-align: right;height: 100%;");

    if(snapshot.val().username===localStorage.getItem('username')){
      var deleteBtn = $("<button>");
    deleteBtn.attr("style", "font-size:10px");
    deleteBtn.addClass("delete-btn");
    deleteBtn.attr("id", "delete-"+snapshot.key);
    deleteBtn.text("X");
    newDivBtns.append(deleteBtn);
    newDivBtns.append("<br/>");
    newDivBtns.append("<br>");
    }  

    var topicBtn = $("<button>");
    topicBtn.attr("style", "font-size:10px");
    topicBtn.text(snapshot.val().category);

    switch (snapshot.val().category) {
      case 'General':
        topicBtn.addClass("btn-dark");
        break;
      case 'JavaScript':
        topicBtn.addClass("btn-warning");
        break;
      case 'HTML':
        topicBtn.addClass("btn-info");
        break;
      case 'CSS':
        topicBtn.addClass("btn-danger");
        break;
    }

    var lrnBtn = $("<button>");
    lrnBtn.addClass("btn btn-secondary expand-btn");
    lrnBtn.attr("style", "font-size:10px");
    lrnBtn.attr("data-toggle", "collapse");
    lrnBtn.attr("data-target", "#" + snapshot.val().username.replace(/\s/g, "") + snapshot.key);
    lrnBtn.attr("aria-expanded", "true");

    lrnBtn.text('more ▼')

    
    newDivBtns.append(topicBtn);
    newDivBtns.append("<br/>");
    newDivBtns.append("<br>");
    newDivBtns.append(lrnBtn);

    cardHeaderDiv.append(newImg);
    cardHeaderDiv.append(newDiv);
    cardHeaderDiv.append(newDivBtns);

    var groupDiv = $('<div>');
    groupDiv.addClass('card my-2 group-div');
    groupDiv.attr("id", snapshot.key);

    groupDiv.append(cardHeaderDiv);
    accordionDiv.append(learnMoreDiv);
    groupDiv.append(accordionDiv);

    if (prevChildKey === null) {

      $('#main-page').prepend(groupDiv);
    }
    else {
      $(groupDiv).insertAfter("#" + prevChildKey);
    }


    printLearnMore(snapshot);

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

// retrievingData();

function printLearnMore(snapshot) {

  var newDivMain = $('<div>');
  newDivMain.addClass('card-body');
  var creatorTitle = $('<h5>');
  creatorTitle.addClass('card-title');
  creatorTitle.text('Creator: ');
  var createName = $('<p>');
  createName.text(snapshot.val().username);
  var participantsTitle = $('<h5>');
  participantsTitle.addClass('card-title');
  participantsTitle.text('Participants: ');
  var participantList = $('<p>');
  participantList.attr('id', 'participant-' + snapshot.key)
  participantList.text(snapshot.val().participants)
  var joinBtn = $('<button>');
  joinBtn.addClass('btn btn-primary join-btn')
  joinBtn.attr('data-toggle', 'button');
  joinBtn.attr('aria-pressed', 'false');
  joinBtn.attr('autocomplete', 'off');
  joinBtn.attr('data-target', 'participant' + snapshot.key);
  joinBtn.attr("id", "join-" + snapshot.key);

  var joinText = $('<p>');
  joinText.text('+ join');
  joinBtn.append(joinText);

  var questionList = $('<h5>');
  questionList.text('FAQ: ');

  newDivMain.append(creatorTitle);
  newDivMain.append(createName);
  newDivMain.append('<br>');
  newDivMain.append(participantsTitle);
  newDivMain.append(participantList);
  newDivMain.append('<br>');
  newDivMain.append(joinBtn);
  newDivMain.append('<br>');
  newDivMain.append('<br>');
  newDivMain.append(questionList);

  if (snapshot.val().qstns) {

    for (var i = 0; i < snapshot.val().qstns.length; i++) {
      var newA = $("<a/>");
      newA.addClass("card-text");
      newA.text(snapshot.val().qstns[i].keywordTitle);
      // newA.attr("src",);
      // newDiv.text(snapshot.val().qstns[i].keywordTitle);
      newA.attr("href", snapshot.val().qstns[i].keywordURL);
      newA.attr("target", "_blank");
      // newA.append(newDiv);
      // questionList.append(newA)
      newDivMain.append(newA)
    }
  }

  var bookList = $('<h5>');
  bookList.text('Books Recommended: ');

  newDivMain.append(bookList);

  if (snapshot.val().books) {

    for (var i = 0; i < snapshot.val().books.length; i++) {
      var newA = $("<a/>");
      newA.addClass("card-text");
      // newA.attr("src",);
      newA.text(snapshot.val().books[i].bookImg);
      newA.attr("href", snapshot.val().books[i].info_url);
      newA.attr("target", "_blank");
      // newA.append(newDiv);
      // questionList.append(newA)
      newDivMain.append(newA)
    }
  }

  learnMoreDiv.append(newDivMain);


}

$(document).on('click', '.join-btn', function () {
  var id = ($(this)[0].id).split('-');
  var part = $('#participant-' + id[1]);
  if (part.text().split(' , ').indexOf(localStorage.getItem('username')) > -1) {
    alert("you are already a member");
  }
  else {
    var parties = part.text(part.text() + " , " + localStorage.getItem('username'));
    updateFirebase(id[1], parties[0].textContent);
  }
});

function updateFirebase(key, parties) {
  database.ref("/groupArray/" + key).update({
    participants: parties.split(" , ")
  })
};

$(document).on('click','.delete-btn', function (){
  var id = ($(this)[0].id).split('-');
  database.ref("/groupArray/" + id[1]).remove();
});

database.ref("/groupArray").on("child_removed", function(snapshot) {
  launchMainPage();
});
