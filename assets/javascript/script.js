console.log("Loaded.");

var config = {
    apiKey: "AIzaSyCID1KjHbntf6mXybcg05DdcbjgvRgRRvA",
    authDomain: "train-schedule-9530e.firebaseapp.com",
    databaseURL: "https://train-schedule-9530e.firebaseio.com",
    projectId: "train-schedule-9530e",
    storageBucket: "train-schedule-9530e.appspot.com",
    messagingSenderId: "158630373232"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "MM/DD/YYYY").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    console.log("New train successfully added.");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency)
    );

    $("#train-schedule-body").append(newRow);
});