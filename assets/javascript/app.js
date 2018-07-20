var topics = ["cats", "dogs", "funny", "sad", "music", "beer", "pugs", "tired", "confused", "lost", "hungry", "full"];

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
  
    topics.push(search);
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
          var topicDiv = $("<div>");
    
          var p = $("<p>").text("Rating: " + results[i].rating);
    
          var topicImage = $("<img>");
    
          topicImage.attr("src", results[i].images.fixed_height.url);
    
          topicDiv.append(p);
          topicDiv.append(topicImage);
    
          $(".gifs").prepend(topicDiv);
        }
      });
      generateButtons();
  });

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var topic = $("#topic-input").val().trim();

  topics.push(topic);

  generateButtons();
});

function getGifs() {
  current = [];

  $(".gifs").empty();
  var topicBtn = $(this).attr("data-name");

  current.push(topicBtn);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicBtn + "&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var topicImage = $("<img>");

      topicImage.attr("src", results[i].images.fixed_height.url);

      topicDiv.append(p);
      topicDiv.append(topicImage);

      $(".gifs").prepend(topicDiv);
    }
  });
}

function moreGifs() {

    if (current === undefined || current.length == 0) return;

  var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + current + "&api_key=dzmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var topicImage = $("<img>");

      topicImage.attr("src", results[i].images.fixed_height.url);

      topicDiv.append(p);
      topicDiv.append(topicImage);

      $(".gifs").prepend(topicDiv);
    }
  });
 
};

generateButtons();
