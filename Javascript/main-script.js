var hidden = true;

if(hidden === true){
$("#event-listing").hide();
}

$("#search").on("click",function(){

    var APIKey = "988fa458a5408476aacc624353627825";
    var queryURL = "https://rest.bandsintown.com/artists/" + $(".artist-value").val() + "/events?app_id="+APIKey+";"
    
      
    // We then created an AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            hidden = true;
            if(hidden === true){
            $("#event-listing").show();   
            }
            for(var i = 0; i < response.length; i++){
                $(".list-events").append("<tr class='bottom-rule'><td><h4 class='event-date'>"+dateFns.format(new Date(dateFns.parse(response[i].datetime)),"MMM DD YYYY")+"</h4></td><td class='venue-info''>"+response[i].venue.city+"</td><td><a class='btn btn-primary' href='"+response[i].offers[0].url+"' role='button'>Tickets</a></td></tr>");
            }
        });

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            
        });


}); 