// Get a reference to the database service
var config = {
    apiKey: "AIzaSyDNQ0JxwHblNbyEPWdC1W2Cymi6WoluJi0",
    authDomain: "js-fiddle-sample.firebaseapp.com",
    databaseURL: "https://js-fiddle-sample.firebaseio.com",
    storageBucket: "js-fiddle-sample.appspot.com",
    messagingSenderId: "472842031097"
};
firebase.initializeApp(config);

var database = firebase.database();

var movies = database.ref("movies");
/*var data = {
  name: 'Get Out',
  rating: 10
}
    database.ref('movies').push(data);*/

$("#delete").click(function () {
    var answer = prompt('Are you sure you want to delete all the data? Type "yes" or "no"');
    if (answer == "yes") {
        database.ref('movies').remove();
    } else {
        alert("Did not delete Data")
    }
});


$("#submit").click(function () {
    var name = $('#nameInput').val();
    var rating = $('#ratingInput').val();
    var date = new Date().toDateString();
    var data = {
        name: name,
        rating: rating,
        date: date
    };
    if (name.length > 0 && rating.length > 0) {
        database.ref('movies').push(data);
        $('#nameInput').val('');
        $('#ratingInput').val('');
    }

});

movies.on('child_added', function (snapshot) {
    //Do something with the data
    var movieData = snapshot.val();
    var table = [];
    table.push(movieData);
    console.log(snapshot.val());
    for (var i = 0; i < table.length; i++) {
        //console.log(table[i].name + table[i].rating);
        var surLaTable = document.getElementById("myTable");
        var row = surLaTable.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = table[i].name;
        cell2.innerHTML = table[i].rating;
        cell3.innerHTML = table[i].date
    }
});
