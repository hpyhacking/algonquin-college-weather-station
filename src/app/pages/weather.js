const Weather = require('../modules/weather.js')

$(document).ready(function() {
    if ($("meta[name=page]").attr('content') != "weather") {
      return
    }
  
    let urlParams = new URLSearchParams(window.location.search)
    let lat = urlParams.get('lat')
    let lon = urlParams.get('lon')
    let cityName = urlParams.get('city')
    let geoForWeather = new Weather(lat, lon)

    geoForWeather.request(function(data){
        //overall weather
        $("#cityName").text(cityName)
        $("#currentTemp").text(data.current.temp + "°")
        $("#weatherDesc").text(data.current.weather[0].description)
        $("#tempMin").text("H: " + data.daily[0].temp.min + "°")
        $("#tempMax").text("L: " + data.daily[0].temp.max + "°")

        //24 hourly weather
        let hourly24 = data.hourly.slice(0, 24)

        for (let hourly of hourly24) {
          var timeStamp= hourly.dt
          var dateFormat = new Date(timeStamp*1000)
          let getHour = dateFormat.getHours().toString()

          let formmatedHour
          if (getHour.length === 1) {
            formmatedHour = '0'+ getHour
          } else {
            formmatedHour = getHour
          }

          let i = hourly24.indexOf(hourly)
          $(".formmatedHour")[i].textContent = formmatedHour
          $(".hourlyTemp")[i].textContent = hourly.temp + "°"
          $(".houlyIcon")[i].innerHTML = getIcon(hourly.weather[0].main)         
        }

        //7 daily weather
        let daily7 = data.daily.slice(1, 8)
        $(".daily").each(function(i, element){
          var timeStamp= daily7[i].dt
          var dateFormat = new Date(timeStamp*1000)
          let dayOfWeek = dateFormat.toDateString().slice(0, 4)
          $(element).find(".dayOfWeek").text(dayOfWeek)
          $(element).find(".dailyIcon").html(getIcon(daily7[i].weather[0].main))
          $(element).find(".dailyTempMin").text(daily7[i].temp.min + "°")
          $(element).find(".dailyTempMax").text(daily7[i].temp.max + "°")
        })

        //other weather details
        $("#feelsLike").text(data.current["feels_like"] + "°")
        $("#iconFeelsLike").html('<i class="fas fa-temperature-high"></i>')
        
        $("#visibility").text(data.current.visibility + " km")
        $("#iconVisibility").html('<i class="fas fa-eye"></i>')

        $("#humidity").text(data.current.humidity + "%")
        $("#iconHumidity").html('<i class="fas fa-tint"></i>')
        
        $("#windSpeed").text(data.current["wind_speed"] + " km/h")
        $("#iconWindSpeed").html('<i class="fas fa-wind"></i>')
    });


    function getIcon(descMain) {
      let icon;
      if (descMain === "Thunderstorm") {
        icon = '<i class="fas fa-poo-storm"></i>'
      }
      else if (descMain === "Drizzle") {
        icon = '<i class="fas fa-cloud-rain"></i>'
      }
      else if (descMain === "Rain") {
        icon = '<i class="fas fa-cloud-showers-heavy"></i>'
      }
      else if (descMain === "Snow") {
        icon = '<i class="fas fa-snowflake"></i>'
      }
      else if (descMain === 'Clouds') {
        icon = '<i class="fas fa-cloud"></i>'
      }
      else if (descMain === 'Clear') {
        icon = '<i class="fas fa-sun"></i>'
      }
      else if (descMain === "Mist")  {
        icon = '<i class="fas fa-smog"></i>'
      }
      else if (descMain === "Fog")  {
        icon = '<i class="fas fa-smog"></i>'
      }

      return icon
    } 

  })
  
