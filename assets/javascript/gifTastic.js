var topics = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle"
];
function displayTopicInfo() {
  //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
  //xhr.done(function(data) { console.log("success got data", data); });
  var animal = $(this).attr("data-name");
  var url = "https://api.giphy.com/v1/gifs/search?q=";

  var key = "&api_key=fmRet6tdtCKvnnfM5jlQ3355cYy1p7wG&limit=10";
  var queryURL = url + animal + key;
  console.log(queryURL);
  // http://api.giphy.com/v1/gifs/search?q=cats&api_key=fmRet6tdtCKvnnfM5jlQ3355cYy1p7wG&limit=10
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      for (var i = 0; i < 10; i++) {
        // Creating a div to hold the movie
        var topicDiv = $("<div class='topic'>");

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        topicDiv.append(pOne);

        // Retrieving the URL for the image
        var imgURL = response.data[i].images.original.url;
        console.log(imgURL);
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        topicDiv.prepend(image);

        // Putting the entire movie above the previous movies
        $("#animals-view").prepend(topicDiv);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function renderButtons() {
  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $(".topic").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#animals-view").append(a);
  }
}
$("#add-animal.btn.btn-primary").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  topics.push(animal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
