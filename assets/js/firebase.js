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
$("#submit-btn").on("click", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  var topic = $("#topic-input").val();
  var category = $("#category-input").val();
  var difficulty = $("#difficulty-input").val();
  var startTime = $("#start-time-input").val();
  var endTime = $('#end-time-input').val();
  var capacity = $("#capacity-input").val();
  var locationChoice = $("#location-input").val();
  var date = $("#date-input").val();
  

  console.log('test', topic);

  // Change what is saved in firebase
  database.ref().set({
    topic: topic,
    category: category,
    difficulty: difficulty,
    startTime: startTime,
    endTime: endTime,
    capacity: capacity,
    locationChoice: locationChoice,
    date: date,
    username: username

  })
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log(snapshot.topic);
  console.log(snapshot.val().startTime);
  console.log(snapshot.val().endTime);
  console.log(snapshot.val().category);
  console.log(snapshot.val().difficulty);
  console.log(snapshot.val().capacity);
  console.log(snapshot.val().username);
  console.log(snapshot.val().date);

  // create a dynamic div
    var cardDiv = $("<div class=''>");
    var a = $("<p>");
    a.text(snapshot.val().locationChoice);
    a.attr('class', "location")
    a.addClass('data-location', "Real Location")
    $("#group2019").prepend(a);

 

//   // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});