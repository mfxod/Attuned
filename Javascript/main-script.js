$("#search").on("click",function(){
    alert("works!");
    var APIKey = "kF0IDN1pYNuH8ZYf3jf2yQEPcNC2CHjG";
    var queryURL = "https://rest.bandsintown.com/artists/" + "Chris Brown" + "?app_id=codingbootcamp;"


      
    // We then created an AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
        });
}); 