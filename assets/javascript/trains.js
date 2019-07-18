console.log("Working Javascript for Train Schedule")




    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCUr6QOBCIaRe4FQrDPMvbciUiK37eqNHg",
        authDomain: "trainschedule-4fc76.firebaseapp.com",
        databaseURL: "https://trainschedule-4fc76.firebaseio.com",
        projectId: "trainschedule-4fc76",
        storageBucket: "trainschedule-4fc76.appspot.com",
        messagingSenderId: "13524740258",
        appId: "1:13524740258:web:51262df014aa9ef3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebaseConfig);

    //create a variable to reference the database

    var dataref = firebase.database();

    var currentTime = moment().format();

    //display current time
    var uclock = function(){
        clock = $("#currentTime");
        date = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a');
        clock.html('<h3>' + date + '</h3>');
        //isolates the seconds
        var indCol = date.indexOf(':');
        var seconds = (date.substring(indCol + 4, date.length -3));

        // if(seconds == '00'){
        //     updateTable();
        // };
    };

    uclock();
    setInterval(uclock, 1000);

    // on click function for the button
    $("#add-user").on("click", function (event) {
        event.preventDefault();
        // console.log(dataref)
        
        // code in logic for storing and retrieving the most recent information.
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();
        
        console.log(name);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        // var newTrain = {
        //     name: name,
        //     destination: destination,
        //     firstTrain: firstTrain,
        //     frequency: frequency,
        //     dataAdded: firebase.database.ServerValue.TIMESTAMP
        // }

        // clear input fields after submit
        $("#name").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        // push data rather than set in order to add onto previous data
        dataref.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dataAdded: firebase.database.ServerValue.TIMESTAMP
        });

    })
    //firebase event for when the user adds their train information
    dataref.ref().on("child_added", function(snapshot) {
    event.preventDefault();
        console.log(snapshot.val());


    // creating variables to store into firebase
    var tname = snapshot.val().name;
    var tdestination = snapshot.val().destination;
    var tfirstTrain = snapshot.val().firstTrain;
    var tfrequency = snapshot.val().frequency;
    //variable to figure out the trains converted time
    var trainTimeConverted = moment(tfirstTrain, 'HH:mm');
    //variable to figure out the difference 
    var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
        console.log(timeDifference);
    
    var frequencyMinutes = snapshot.val().frequency;
        console.log("Frequency Minutes: " + frequencyMinutes);

    var minutesAway = Math.abs(timeDifference % frequencyMinutes);
        console.log("Minutes Away: " + minutesAway);

    var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
        console.log("Next Arrival: " + nextArrival);
    
    
    //Adding into the table
  $("#schedule-panel").append("<tr><td>" + tname + "</td><td>" + tdestination + "</td><td>" + tfrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});










