
// ----- FUNCTIONS -----

function hideSections() {
  $("#artist-info").hide();
  $("#event-listing").hide();
};

function emptySections() {
  $("#artist-name-bio").empty();
  $("#artist-img").empty();
  $(".table").empty();
};

function showEventHeader() {
  const dateTH = $("<th>").attr("scope", "col").text("Date");
  const venueTH = $("<th>").attr("scope", "col").text("Venue");
  const ticketsTH = $("<th>").attr("scope", "col").text("Get Tickets");
  const headerRow = $("<tr>").append(dateTH, venueTH, ticketsTH);

  $(".table").append($("<thead>").append(headerRow));
};

function showSections() {
  $("#artist-info").show();
  $("#event-listing").show();
  showEventHeader();
};

function clearSearch() {
  $("#search-bar").val("");
};



// ----- PROCESS -----

hideSections();

$("#button-addon1").on("click", function() {
  // Bands in Town API variables
  const bandsAPIKey = "988fa458a5408476aacc624353627825";
  const artistQueryURL = "https://rest.bandsintown.com/artists/" + $(".artist-value").val() + "?app_id=" + bandsAPIKey;
  const eventsQueryURL = "https://rest.bandsintown.com/artists/" + $(".artist-value").val() + "/events?app_id=" + bandsAPIKey;
  // LastFM API variables
  const lastFMkey = "00461b08c2c1c12caf8762c69e5f98f2";
  const lastFMqueryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + $(".artist-value").val() + "&api_key=" + lastFMkey + "&format=json";

    if(!$(".artist-value").val()) {
        //handle
        console.log('made it there is no val')
      $("#artist-name-bio").html("<h4>Please submit an artist!</h4>")
     // $("#artist-img").hide();
      //$("#event-listing").hide();       
        return 
    }
  // query lastFM API for artist name and album info
  $.ajax({
    url: lastFMqueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  
    
    if (response.message === "The artist you supplied could not be found") {
      console.log("ease our troubled minds!");
      $("#artist-name-bio").append($("<h4>").text(response.message))
      $("#artist-img").hide();
      $("#event-listing").hide();
    } else {
      var summary = response.artist.bio.summary;
      var summaryFixed = summary.substring(0,summary.indexOf("<a href"));
      $("#artist-name-bio").append($("<h2>").text(response.artist.name));
      $("#artist-name-bio").append($("<p>").text(summaryFixed));
    };
  });

  // query Bands In Town API for artist img
  $.ajax({
    url: artistQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    $("#artist-img").append($("<img>").attr({
      "class": "artist-img",
      "src": response.image_url,
      "alt": response.name + "photo"
    }));
  });  

  // query Bands In Town API for event listings
  $.ajax({
    url: eventsQueryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    // event listing
    for (var i = 0; i < response.length; i++) {
      const date = dateFns.format(new Date(dateFns.parse(response[i].datetime)), "M/D/YYYY");
      const venue = response[i].venue.name + ", " + response[i].venue.city + ", " + response[i].venue.region + ", " + response[i].venue.country;

      const dateTD = $("<td>").append($("<h4>").addClass("event-date").text(date));
      const venueTD = $("<td>").addClass("venue-info").text(venue);
      const buttonTD = $("<td>").append($("<a>").attr({
        "class": "btn btn-primary",
        "href": response[i].offers[0].url,
        "role": "button"
        }).text("Tickets"));
      const eventTr = $("<tr>").addClass("bottom-rule");
  
      eventTr.append(dateTD, venueTD, buttonTD);
      $(".table").append(eventTr);
    };
  });

  emptySections();
  showSections();
  clearSearch();
});