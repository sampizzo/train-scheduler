$(document).ready(function() {
  var firebaseConfig = {
    apiKey: "AIzaSyBrMUg321ANQM_8g8FcEqPii5tIhJX-w-M",
    authDomain: "train-scheduler-288da.firebaseapp.com",
    databaseURL: "https://train-scheduler-288da.firebaseio.com",
    projectId: "train-scheduler-288da",
    storageBucket: "train-scheduler-288da.appspot.com",
    messagingSenderId: "386803741856",
    appId: "1:386803741856:web:eed60469bf0515ef0ec5c5",
    measurementId: "G-H9BKDLCNJT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  var database = firebase.database();

  // click event listener
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Declare input form variables
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    // use moment to format time
    var firstTrainTime = moment(
      $("#first-train-input")
        .val()
        .trim(),
      "HHmm"
    ).format("HH:mm");
    var frequency = $("#frequency-input")
      .val()
      .trim();

    // new train object for user input
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };

    // push newTrain object to db
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });

    // clear input text
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(snapshot) {
    var snapVal = snapshot.val();

    var trainNameData = snapVal.trainName;
    var destinationData = snapVal.destination;
    var firstTrainTimeData = snapVal.firstTrainTime;
    var frequencyData = snapVal.frequency;

    // var formattedTime = moment.HHmm(firstTrainTimeData).format("HH:mm");

    // var currentTime = moment();

    // time difference
    var timeDifference = moment().diff(moment(firstTrainTime), "minutes");

    // time remainder
    var timeRemainder = timeDifference % frequencyData;

    // minutes away until arrival
    var minsAway = frequencyData - timeRemainder;

    // next arrival
    var nextArrivalData = moment().add(minsAway, "minutes");

    // populate table
    $(".table > tbody").append(
      "<tr><td>" +
        trainNameData +
        "</td><td>" +
        destinationData +
        "</td><td>" +
        frequencyData +
        "</td><td>" +
        nextArrivalData +
        "</td><td>" +
        minsAway +
        "</td></tr>"
    );
  });
});
