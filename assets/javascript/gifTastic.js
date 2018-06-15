var topics = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle",
  "sloth"
];
function displayTopicInfo() {
  var animal = $(this).attr("data-name");
  var url = "https://api.giphy.com/v1/gifs/search?q=";
  var key = "&api_key=fmRet6tdtCKvnnfM5jlQ3355cYy1p7wG&limit=10";
  var queryURL = url + animal + key;

  $("#animals-view").empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      for (var i = 0; i < 10; i++) {
        // Creating a div to hold the animal
        var topicDiv = $("<div class='topic' style='width: 300px'>");

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        topicDiv.append(pOne);

        // Retrieving the URL for the image
        var imgURL = response.data[i].images.original_still.url;
        var animate = response.data[i].images.original.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        image.addClass("gif");

        // var imgURL = response.data[i].images.original.url;
        image.attr("data-still", imgURL);

        image.attr("data-animate", animate);
        console.log("this is the animate " + animate);

        image.attr("data-state", "still");

        // Appending the image
        topicDiv.prepend(image);

        // Putting the entire animal above the previous animals
        $("#animals-view").prepend(topicDiv);
      }
      $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");

        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function renderButtons() {
  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");

    // Adding a class of animal-btn to our button
    a.addClass("animal-btn btn btn-info");

    // Adding a data-attribute
    a.attr("data-name", topics[i]);

    // Providing the initial button text
    a.text(topics[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

$("#add-animal.btn.btn-primary").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  topics.push(animal);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn.btn.btn-info", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
