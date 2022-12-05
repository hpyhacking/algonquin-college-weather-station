const Weather = require('../modules/weather.js');

$(document).ready(function() {
    if ($("meta[name=page]").attr('content') != "weather") {
      return;
    }
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lat = urlParams.get('lat');
    const lon = urlParams.get('lon');
    const cityName = urlParams.get('city');
    console.log(lat + "," + lon);
    let geoForWeather = new Weather(lat, lon);

    geoForWeather.request(function(data){
        localStorage.setItem(lat + "," + lon, data);
        
        let currentTemp = data.current.temp;
        let weatherDesc = data.current.weather[0].description;
        let feelsLike = data.current["feels_like"];
        let humidity = data.current.humidity;
        let visibility = data.current.visibility;
        let windSpeed = data.current["wind_speed"];
        let currentDay = data.daily[0];
        let tempMin = currentDay.temp.min;
        let tempMax = currentDay.temp.max;

        //get and display hourly data
        let hourly24 = data.hourly.slice(0,24);
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

          let hour = formmatedHour;
          let hourWeatherDesc = hourly.weather[0].description;
          let hourTemp = hourly.temp;
          let hourText = $('<p></p>').text(hour);
          let hourWeatherDescText = $('<p></p>').text(hourWeatherDesc).css('text-transform', 'capitalize');
          let hourTempText = $('<p></p>').text(hourTemp + "°");

          let li = $('<li></li>').append(hourText, hourWeatherDescText, hourTempText);
          $("#hourlyUl").append(li);
        }

        //over all weather info on the top
        $('#overall').append($('<p>').text(cityName));
        $('#overall').append($('<p>').text(currentTemp + "°"));
        $('#overall').append($('<p>').text(weatherDesc).css('text-transform', 'capitalize'));
        $('#overall').append($('<p>').text("H: " + tempMin + "°"));
        $('#overall').append($('<p>').text("L: " + tempMax + "°"));

        //other info on the bottom
        let liFeelsLike = $('<li></li>');
        liFeelsLike.append($('<p>').text("Feels Like"));
        liFeelsLike.append($('<p>').text(feelsLike + "°"));

        let liVisibility = $('<li></li>');
        liVisibility.append($('<p>').text("Visibility"));
        liVisibility.append($('<p>').text(visibility + "°"));

        let liHumidity = $('<li></li>');
        liHumidity.append($('<p>').text("Humidity"));
        liHumidity.append($('<p>').text(humidity + "%"));

        let liWindSpeed = $('<li></li>');
        liWindSpeed.append($('<p>').text("Wind Speed"));
        liWindSpeed.append($('<p>').text(windSpeed + "km/h"));

        $('#detailsUl').append(liFeelsLike);
        $('#detailsUl').append(liVisibility);
        $('#detailsUl').append(liHumidity);
        $('#detailsUl').append(liWindSpeed);
    });
  })
  
