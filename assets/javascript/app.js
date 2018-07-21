var topics = ["cats", "dogs", "funny", "sad", "music", "beer", "pugs", "tired", "confused", "lost", "hungry", "full", "hello"];

var current = [];

$(document).on("click", ".topic-btn", getGifs);

$("#more-topic").on("click", function(){
    moreGifs();
});

$("#clear").on("click", function(){
    $(".gifs").empty();
    $("#search-input").val(" ");
    current = [];
});

function generateButtons() {

  $(".topics").empty();

  for (var i = 0; i < topics.length; i++) {
   
    var button = $("<button>");
    
    button.addClass("topic-btn");
    
    button.attr("data-name", topics[i]);
    
    button.text(topics[i]);
    
    $(".topics").append(button);
  
  }
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
        
    var search = $("#search-input").val().trim();
    current = [];
    topics.push(search);
    current.push(search);
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
        console.log(response);
        
        for (var i = 0; i < results.length; i++) {

          var topicDiv = $("<div class='gifDiv'></div>");
    
          var p = $("<p>").text("Rating: " + results[i].rating);
    
          var gifImage = $("<img>").addClass("gify");

          var download = $("<button>").addClass("download").text("Download");
    
          gifImage.attr("src", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "still");
    
          topicDiv.append(p);
          topicDiv.append(gifImage);
          topicDiv.prepend(download);
    
          $(".gifs").prepend(topicDiv);
          
        }

        $(".gify").on("click", function() {
                
          var state = $(this).attr("data-state");
        
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
                
      });
      generateButtons();
      $("#search-input").val("");
  });

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  $topicInput = $("#topic-input").val();

  if ($topicInput === "") return;

  var topic = $("#topic-input").val().trim();

  topics.push(topic);

  generateButtons();

  $("#topic-input").val("");
});

function getGifs() {
  current = [];

  $(".gifs").empty();
  var topicBtn = $(this).attr("data-name");

  current.push(topicBtn);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicBtn + "&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
       
    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div class='gifDiv'></div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>").addClass("gify");

      var download = $("<button>").addClass("download").text("Download");

      gifImage.attr("src", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "still");

      topicDiv.append(p);
      topicDiv.append(gifImage);
      topicDiv.prepend(download);

      $(".gifs").prepend(topicDiv);
    }

    $(".gify").on("click", function() {
       
      var state = $(this).attr("data-state");
    
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  });
}

function moreGifs() {

    if (current === undefined || current.length == 0) return;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + current + "&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div class='gifDiv'></div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>").addClass("gify");

      var download = $("<button>").addClass("download").text("Download");

      gifImage.attr("src", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "still");
      
      topicDiv.append(p);
      topicDiv.append(gifImage);
      topicDiv.prepend(download);

      $(".gifs").prepend(topicDiv);
    }
   
  });
 
};

generateButtons();
