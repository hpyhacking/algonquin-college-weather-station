const Config = require('../modules/config')

const ENDPOINT_GEO = "http://api.openweathermap.org/geo/1.0/direct"

$(document).ready(function() {
    if ($("meta[name=page]").attr('content') != "index") {
      return; 
    }
  
    $("#searchButton").click(function(){
      getGeo($("#searchBar").val());
    });
    
    function getGeo(city) {
        $.getJSON(`${ENDPOINT_GEO}?q=${city}&limit=5&appid=${Config.API_KEY}`,
          function(data){
            let ul = document.querySelector(".search ul");
            for (let location of data) {
              let li = document.createElement("li");
              let a = document.createElement("a");
              a.setAttribute("href", "weather.html?lat=" + location.lat.toFixed(1) + "&lon=" + location.lon.toFixed(1) + "&city=" + location.name);
              a.textContent = location.name+', '+ location.state+', '+ location.country;
              li.appendChild(a);
              ul.appendChild(li);
            }
          }
        );
      }
  })
  
  
  