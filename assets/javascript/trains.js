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
// database.ref().on("child_added", function(snapshot) {
//     console.log(snapshot.val());

//     name = snapshot.val().name;
//     destination = snapshot.val().destination;
// })









