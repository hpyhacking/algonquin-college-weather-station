const Weather = require('../modules/weather.js')
const WatchingList= require('../ui/watching_list')

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
        $("#currentTemp").text(Math.round(data.current.temp) + "°")
        $("#weatherDesc").text(data.current.weather[0].description)
        $("#tempMin").text("L: " + Math.round(data.daily[0].temp.min) + "°")
        $("#tempMax").text("H: " + Math.round(data.daily[0].temp.max) + "°")

        //24 hourly weather
        let hourly24 = data.hourly.slice(0, 24)

        $(".hourly").each(function(i, element){
          var timeStamp= hourly24[i].dt
          var dateFormat = new Date(timeStamp*1000)
          let getHour = dateFormat.getHours().toString()

          let formmatedHour
          if (getHour.length === 1) {
            formmatedHour = '0'+ getHour
          } else {
            formmatedHour = getHour
          }
          
          $(element).find(".formmatedHour").text(formmatedHour)
          $(element).find(".hourlyTemp").text(Math.round(hourly24[i].temp) + "°")
          $(element).find("i").addClass(getIcon(hourly24[i].weather[0].main))
        })

        //7 daily weather
        let daily7 = data.daily.slice(1, 8)
        $(".daily").each(function(i, element){
          var timeStamp= daily7[i].dt
          var dateFormat = new Date(timeStamp*1000)
          let dayOfWeek = dateFormat.toDateString().slice(0, 4)
          $(element).find(".dayOfWeek").text(dayOfWeek)
          $(element).find("i").addClass(getIcon(daily7[i].weather[0].main))
          $(element).find(".dailyTempMin").text(Math.round(daily7[i].temp.min) + "°")
          $(element).find(".dailyTempMax").text(Math.round(daily7[i].temp.max) + "°")
        })

        //other weather details
        $("#feelsLike").text(data.current["feels_like"] + "°")
        $("#visibility").text(data.current.visibility + " km")
        $("#humidity").text(data.current.humidity + "%")
        $("#windSpeed").text(data.current["wind_speed"] + " km/h")
    });


    function getIcon(descMain) {
      let icon;
      if (descMain === "Thunderstorm") {
        icon = "fas fa-poo-storm"
      }
      else if (descMain === "Drizzle") {
        icon = "fas fa-cloud-rain"
      }
      else if (descMain === "Rain") {
        icon = "fas fa-cloud-showers-heavy"
      }
      else if (descMain === "Snow") {
        icon = "fas fa-snowflake"
      }
      else if (descMain === 'Clouds') {
        icon = "fas fa-cloud"
      }
      else if (descMain === 'Clear') {
        icon = "fas fa-sun"
      }
      else if (descMain === "Mist")  {
        icon = "fas fa-smog"
      }
      else if (descMain === "Fog")  {
        icon = "fas fa-smog"
      }

      return icon
    } 

    let list = new WatchingList()

    if (list.isExist(lat, lon)) {
      $("#plusButton").hide()
    }
    else {
      $("#minusButton").hide()
    }

    $("#minusButton").on('click', function(){
      list.remove(lat, lon)
      $("#plusButton").show()
      $("#minusButton").hide()
    })

    $("#plusButton").on('click', function(){
      list.add(cityName, lat, lon)
      $("#plusButton").hide()
      $("#minusButton").show()
    })
  })
  
