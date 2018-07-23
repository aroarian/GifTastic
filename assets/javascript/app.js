$( document ).ready(function() {
  
  var topics = ["cats","dogs","funny","sad","music","beer",
    "pugs",
    "tired",
    "confused",
    "lost",
    "hungry",
    "full",
    "hello"
  ];

  var current=[];

  $("div.gifs").on("click", "img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $(document).on("click", ".topic-btn", function(){
    current = [];
    start = "10";
    end = "0";
    var searchTerm = $(this).attr("data-name");
    if (searchTerm !== current[0]){
      $(".gifs").empty();
    }
    getGifs(start,end,searchTerm);
  });

  $("#more-topic").on("click", function() {
    if (current.length === 0 || current === undefined) return;    
    start = "10";
    end = "10";
    var searchTerm = current[0];
    getGifs(start,end,searchTerm);
  });

  $("#clear").on("click", function() {
    $(".gifs").empty();
    $("#search-input").val(" ");
    current = [];
  });

  $("#search-button").on("click", function(event) {
    event.preventDefault();

    searchTerm = $("#search-input").val().trim();

    if (searchTerm === "") return;

    start = 10;
    end = 0;
    
    topics.push(searchTerm);
    current.push(searchTerm);

    getGifs(start,end,searchTerm);

    generateButtons();
    $("#search-input").val("");
  });

  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    $topicInput = $("#topic-input").val();
 
    if ($topicInput === "") return;

    var topic = $("#topic-input").val().trim().toLowerCase();

    topics.push(topic);

    generateButtons();

    $("#topic-input").val("");
  });


  function generateButtons() {
    $(".favorites").empty();

    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");

      button.addClass("topic-btn");

      button.attr("data-name", topics[i]);

      button.text(topics[i]);

      $(".favorites").append(button);
    }
  }

  
  function getGifs(start, end, term) {
 
    var searchTerm;
    if (term) {
       searchTerm = term;
    } else {
      searchTerm = $(this).text();
    }
    
    current.push(searchTerm);

    var queryURL = 
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=zmCZ9gyr4a3j3D4LKgskw7ykgskVAfRI&limit=${start}&offset=${end}&rating=pg`;

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
        
        var download = $("<a href=" + results[i].images.original.url +" download target='_blank'>" + "<button class='download'>Download</button></a>");
          

        gifImage
          .attr("src", results[i].images.fixed_height_still.url)
          .attr("data-animate", results[i].images.fixed_height.url)
          .attr("data-still", results[i].images.fixed_height_still.url)
          .attr("data-state", "still");

        topicDiv.append(p);
        topicDiv.append(gifImage);
        topicDiv.prepend(download);

        $(".gifs").prepend(topicDiv);
      }
    });
    
  }
  generateButtons();
});
