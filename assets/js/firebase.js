var config = {
    apiKey: "AIzaSyC9QlOZmk3D4Wt8kAVji0-BO4jsYDvwwLY",
    authDomain: "fir-multiple-properties.firebaseapp.com",
    databaseURL: "https://fir-multiple-properties.firebaseio.com",
    storageBucket: "fir-multiple-properties.appspot.com"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Initial Variables (SET the first set IN FIREBASE FIRST)
  // Note remember to create these same variables in Firebase!
  var name = "";
  var age = "";
  var phone = "";

  // Click Button changes what is stored in firebase
  $("#click-button").on("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    name = $("#name-input").val().trim();
    age = $("#age-input").val().trim();
    phone = $("#phone-input").val().trim();

    // Change what is saved in firebase
    database.ref().set({
      name: name,
      age: age,
      phone: phone
    });
  });

  // Firebase is always watching for changes to the data.
  // When changes occurs it will print them to console and html
  database.ref().on("value", function(snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().name);
    console.log(snapshot.val().age);
    console.log(snapshot.val().phone);

    // Change the HTML
    $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

    // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });