
// ----- FUNCTIONS -----

function hideSections() {
  $("#artist-info").hide()
  $("#album-info").hide()
  $("#event-listing").hide()
};

function showSections() {
  $("#artist-info").show()
  $("#album-info").show()
  $("#event-listing").show()
};

function emptySections() {
  $(".table").empty()
};

function clearSearch() {
  $("#search-bar").val("")
};



// ----- PROCESS -----

hideSections();

$("#button-addon1").on("click", function() {
  const bandsAPIKey = "988fa458a5408476aacc624353627825";
  const bandsQueryURL = "https://rest.bandsintown.com/artists/" + $(".artist-value").val() + "/events?app_id=" + bandsAPIKey;
  // const lastFMkey = "00461b08c2c1c12caf8762c69e5f98f2";
  // const lastFMqueryURL = ???;

  // query Bands In Town API for artist info
  // $.ajax({
  //   url: bandsQueryURL,
  //   method: "GET"
  // }).then(function(response) {
  //   console.log(response);
  //   artist info
  //   $("artist-info").append($("<h2>").text());
  // });

  // query lastFM API for album info
  // $.ajax({
  //   url: lastFMqueryURL,
  //   method: "GET"
  // }).then(function(response) {
  //   console.log(response);
      // album info
  // });

  // query Bands In Town API for event listings
  $.ajax({
    url: bandsQueryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    // event listing
    for (var i = 0; i < response.length; i++) {
      const date = dateFns.format(new Date(dateFns.parse(response[i].datetime)), "MMM DD YYYY");
      const venue = response[i].venue.name + ", " + response[i].venue.city + ", " + response[i].venue.region + ", " + response[i].venue.country;
      const ticketLink = response[i].offers[0].url;

      const dateTD = $("<td>").append($("<h4>").addClass("event-date").text(date));
      const venueTD = $("<td>").addClass("venue-info").text(venue);
      const buttonTD = $("<td>").append($("<a>").attr({
        "class": "btn btn-primary",
        "href": ticketLink,
        "role": "button"
        }).text("Tickets"));
      const eventTr = $("<tr>").addClass("bottom-rule");
  
      eventTr.append(dateTD, venueTD, buttonTD);
      $(".table").append(eventTr);
    }
  });
  
  emptySections();
  showSections();
  clearSearch();
});