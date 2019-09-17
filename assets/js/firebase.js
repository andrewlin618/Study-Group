var groupArrays = [];
var capacityArray=["No Limit","under 5","under 10","under 15"];
var firebaseConfig = {
  // apiKey: "AIzaSyCu102M6JFJfKsBqQDVjE-g-xjs5phBqgk",
  // authDomain: "study-group-e87f4.firebaseapp.com",
  // databaseURL: "https://study-group-e87f4.firebaseio.com",
  // projectId: "study-group-e87f4",
  // storageBucket: "",
  // messagingSenderId: "864676774706",
  // appId: "1:864676774706:web:81b30f57b6370946fecd2b"

  apiKey: "AIzaSyBHMpp3KP1NmBp0unZMFSRPOFEgsqzf-uo",
  authDomain: "clickcounter-c801c.firebaseapp.com",
  databaseURL: "https://clickcounter-c801c.firebaseio.com",
  projectId: "clickcounter-c801c",
  storageBucket: "",
  messagingSenderId: "937174425552",
  appId: "1:937174425552:web:4416899c8f4814b281a3d5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Click Button changes what is stored in firebase
$("#submit-btn").on("click", function (event) {

  event.preventDefault();
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
  groupArrays.push(grpOBJ);

  var key = grpOBJ.date.replace(/-/g, '') + grpOBJ.startTime.replace(/:/g, '') + grpOBJ.endTime.replace(/:/g, '');

  // Change what is saved in firebase
  database.ref("/groupArray").child(key).set(
    {
      category: grpOBJ.category,
      difficulty: grpOBJ.difficulty,
      capacity: grpOBJ.capacity,
      topic: grpOBJ.topic,
      qstns: grpOBJ.qstns,
      books: grpOBJ.books,
      location: grpOBJ.locationChoice,
      date: grpOBJ.date,
      startTime: grpOBJ.startTime,
      endTime: grpOBJ.endTime

    })
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref("/groupArray").on("value", function (snapshot) {
  console.log("Entered reference");
  console.log(snapshot.val());

  for (var i in snapshot.val()) {
    console.log("This is snapshot");
    console.log(snapshot.val()[i].category);
    var headerDiv = $("#cardheader");
    var cardHeaderDiv = $("<div>");
    cardHeaderDiv.addClass("card-header");

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
    newH5.text(snapshot.val()[i].category);


    var newP1 = $("<p>");
    newP1.addClass("time-information");
    newP1.text(snapshot.val()[i].date);


    var newP2 = $("<p>");
    newP2.addClass("location-information");
    newP2.text(snapshot.val()[i].location);


    var newP3 = $("<p>");
    newP3.addClass("capacity-information");
    newP3.text(capacityArray[snapshot.val()[i].capacity]);


    // -----------------------------
    newDiv.append(newH5);
    newDiv.append(newP1);
    newDiv.append(newP2);
    newDiv.append(newP3);

    // ---------------------
    var newDivBtns = $("<div>");
    newDivBtns.addClass("float-right m-2");
    newDivBtns.attr("style", "text-align: right;height: 100%;");

    var topicBtn = $("<button>");
    topicBtn.addClass("btn btn-success");
    topicBtn.attr("style", "font-size:12px");

    var newBTNtop = $("<p>");
    newBTNtop.text(snapshot.val()[i].category);
    topicBtn.append(newBTNtop);

    var lrnBtn = $("<button>");
    lrnBtn.addClass("btn btn-secondary expand-btn");
    lrnBtn.attr("style", "font-size:10px");
    lrnBtn.attr("data-toggle", "collapse");
    lrnBtn.attr("data-target", "#group2019");
    lrnBtn.attr("aria-expanded", "true");

    var newBTNlrn = $("<p>");
    newBTNlrn.text("Learn More");
    lrnBtn.append(newBTNlrn);


    newDivBtns.append(topicBtn);
    newDivBtns.append("<br/>");
    newDivBtns.append("<br>");
    newDivBtns.append(lrnBtn);

    cardHeaderDiv.append(newImg);
    cardHeaderDiv.append(newDiv);
    cardHeaderDiv.append(newDivBtns);

    $("#cardMain").append(cardHeaderDiv);
  }



  //   // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});