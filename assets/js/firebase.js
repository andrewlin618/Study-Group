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
  var username = localStorage.getItem('username');
   
  
  // Change what is saved in firebase
  database.ref().set({
    topic: topic,
    category: category,
    difficulty: difficulty,
    startTime: startTime,
    endTime: endTime,
    capacity: capacity,
    date: date,
    locationChoice: locationChoice,
    username: username
  })

 

});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log('starttime', snapshot.val().startTime);
  console.log('endtime', snapshot.val().endTime);
  console.log('catergory', snapshot.val().category);
  console.log('difficulty', snapshot.val().difficulty);
  console.log('capacity', snapshot.val().capacity);
  console.log('username', snapshot.val().username);
  console.log('date', snapshot.val().date);
  console.log('locationChoice', snapshot.val().locationChoice);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

  // create a dynamic div
    $("#submit-btn").on("click", function(event) {
  //     // Prevent the page from refreshing
      event.preventDefault();

  var imgURL = "assets/images/andrew-lin.png";
  var newCard = $("<div class='card my-2 group-div'>");
  var imgIcon = $("<img>").attr("src", imgURL).attr("class", "image-information creator-img float-left my-3").css("width", "70px").css("height", '70px');
  var hFive = $("<h5>").text("Title: " + snapshot.val().topic);
  var pOne = $("<p>").text(snapshot.val().date + " | " + snapshot.val().startTime);
  newCard.append(hFive);
  newCard.append(imgIcon);
  newCard.append(pOne);

  console.log('new card',  newCard);
  


  //   // $(".topic-information").text(topic);
  //   // var a = $("<p>");
  //   // a.text(snapshot.val().locationChoice);
  //   // a.attr('class', "location")
  //   // a.addClass('data-location', "Real Location")
  //   // $("#group2019").prepend(a);
    })