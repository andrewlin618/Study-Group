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

  // Initial Variables (SET the first set IN FIREBASE FIRST)
  // Note remember to create these same variables in Firebase!
  var title = "";
  var category = "";
  var difficulty = "";
  var time = "";

  // Click Button changes what is stored in firebase
  $("#click-button").on("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    title = $("#title-input").val().trim();
    category = $("#category-input").val().trim();
    difficulty = $("#difficulty-input").val().trim();
    time = $("#time-input").val().trim();

    // Change what is saved in firebase
    database.ref().set({
      title: title,
      category: category,
      difficulty: difficulty,
      time: time,
    });
  });

  // Firebase is always watching for changes to the data.
  // When changes occurs it will print them to console and html
  database.ref().on("value", function(snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().title);
    console.log(snapshot.val().time);
    console.log(snapshot.val().category);
    console.log(snapshot.val().difficulty);

    // Change the HTML
    $("#displayed-data").text(snapshot.val().title + " | " + snapshot.val().category + " | " + snapshot.val().difficulty + " | " + snapshot.val().time);

  //   // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });