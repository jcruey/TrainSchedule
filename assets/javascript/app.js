$(document).ready(function() {
// Link to Firebase
var url = new Firebase("https://trainschedulejc.firebaseio.com/");
var	trainData = url;

// --------------------------------------------------------------

 // Capture Button Click
$("#addTrain").on("click", function() {

	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var freqMin = $('#freqMin').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	

	// local object to hold train data
	var newTrain = ({
		trainName: trainName,
		destination: destination,
		frequency: freqMin,
		firstTrain: firstTrain,
	})
	//push train data to the database
	trainData.push(newTrain);

	//reset the input boxes
	$("#trainName").val("");
	$("#destination").val("");
	$("#freqMin").val("");
	$("#firstTrain").val("");
	//notify user that train was added
	// alert("Train added succesfully!")

	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: .on("value")
trainData.on("child_added", function(snapshot, prevChildKey) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val());
	console.log(snapshot.val().trainName);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().frequency);
	console.log(snapshot.val().firstTrain);
	console.log(snapshot.val().nextArrival);
	console.log(snapshot.val().MinutesTillTrain);

	// First time set 1 year back to ensure comes before
	var firstTrainConverted = moment(snapshot.val().firstTrain,"hh:mm").subtract(1, "years");
		console.log(firstTrainConverted);
	//Current Time
 	var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	// Difference between the times
	var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % snapshot.val().frequency; 
		console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	var nextArrival = nextTrain.format("hh:mm");
	var MinutesTillTrain = tMinutesTillTrain;
	

	// Change the HTML to reflect
	var tableRow = $('<tr>');
		tableRow.prepend('<td>' + MinutesTillTrain + '</td>');
		tableRow.prepend('<td>' + nextArrival + '</td>');
		tableRow.prepend('<td>' + snapshot.val().frequency + '</td>');
		tableRow.prepend('<td>' + snapshot.val().destination + '</td>');
		tableRow.prepend('<td>' + snapshot.val().trainName +'</td>');
	$('#trainData').append(tableRow);



// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
}) 



// --------------------------------------------------------------


	// Change the HTML Values



});

