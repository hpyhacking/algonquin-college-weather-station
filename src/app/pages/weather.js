const Weather = require('../modules/weather.js');

$(document).ready(function() {
    if ($("meta[name=page]").attr('content') != "weather") {
      return;
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lon = urlParams.get('lon');
    const cityName = urlParams.get('city');
    let geoForWeather = new Weather(lat, lon);

    geoForWeather.request(function(data){
        //localStorage.setItem(lat + "," + lon, data);
        $("#cityName").text(cityName);
        $("#currentTemp").text(data.current.temp + "°");
        $("#weatherDesc").text(data.current.weather[0].description);
        $("#tempMin").text("H: " + data.daily[0].temp.min + "°");
        $("#tempMax").text("L: " + data.daily[0].temp.max + "°");

        //get and display hourly data
        let hourly24 = data.hourly.slice(0, 24);

        for (let hourly of hourly24) {
          var timeStamp= hourly.dt;
          var dateFormat = new Date(timeStamp*1000);
          let getHour = dateFormat.getHours().toString();

          let formmatedHour;
          if (getHour.length === 1) {
            formmatedHour = '0'+ getHour;
          } else {
            formmatedHour = getHour;
          }

          let i = hourly24.indexOf(hourly);
          $(".formmatedHour")[i].textContent = formmatedHour;
          $(".hourlyWeatherDesc")[i].textContent = hourly.weather[0].description;
          $(".hourlyTemp")[i].textContent = hourly.temp + "°";          
        }

        //other weather details
        $("#liFeelsLike").text(data.current["feels_like"] + "°");
        $("#liVisibility").text(data.current.visibility + " km");
        $("#liHumidity").text(data.current.humidity + "%");
        $("#liWindSpeed").text(data.current["wind_speed"] + " km/h");
    });
  })
  
