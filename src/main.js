import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#userLocation').click(function(){
    $('#results').val("");
    $('#proximity-results').val("");
    const zipcode = $('#location').val();
    const proximity = $('#proximity').val();
    $('#location').val("");
    $('#proximity').val("");
    let request = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search/count?location=${zipcode}&distance=${proximity}&stolenness=stolen&access_token=${process.env.API_KEY}`;
        request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    request.open("GET",url,true);
    request.send();
    
    function getElements(response){
      let total = response.stolen + response.non;
      $("#results").text(`There are currently ${total} registered bikes in your area, ${response.stolen} of which have been declared stolen.`);
      $("#proximity-results").text(`There are currently ${response.proximity} stolen bikes within ${proximity} mile(s) of your location.`);
    }
  });
});