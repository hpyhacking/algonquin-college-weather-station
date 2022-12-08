const Geocoding = require('../modules/geocoding')

const ITEM_TEMPLATE = `
<li data-lat='#lat#' data-lon='#lon#' data-city='#city#' data-country='#country#'>
  <i class="fas fa-search"></i>
  #city##country#
</li>`

const ITEM_EMPTY_TEMPLATE = `
<li class='nothing'>
  Not found in the world...
</li>`

function applySearching(element) {
  $(window).on('click', function() {
    $(element).find("ul").hide()
  })

  $(element).find("input[type=search]").click(function(event) {
    event.stopPropagation()
  })

  $(element).find("ul").click(function(event) {
    if ($(this).find('li.nothing').length) {
      event.stopPropagation()
    }
  })

  let adjust_resutls = function() {
    let width = $(element).find("input[type=search]").outerWidth()
    $(element).find("ul").css("width", width)
  }

  $(window).resize(adjust_resutls)
  adjust_resutls()

  $(element).find('input[type=search]').on('input', function(){
    clearTimeout(this.delay);
    this.delay = setTimeout(function(){
      $(this).trigger('search')
    }.bind(this), 300)
  }).on('focus', function() {
    if(this.value){
      $(element).find("ul").show()
    }
  }).on('search', function(){
    if(this.value){
      Geocoding.query(this.value, function(data) {
        let results = $(element).find('ul').empty()

        $(element).find("ul").show()

        if (data.length == 0) {
          results.append($(ITEM_EMPTY_TEMPLATE))
        } else {
          data.forEach(function(result) {
            let r = ITEM_TEMPLATE.replaceAll("#lat#", result.lat)
                                 .replaceAll("#lon#", result.lon)
                                 .replaceAll("#city#", result.city)

            if (result.state && result.country_code) {
              r = r.replaceAll("#country#", `, ${result.state}, ${result.country_code}`)
            } else if (result.country_code) {
              r = r.replaceAll("#country#", `, ${result.country_code}`)
            } else {
              r = r.replaceAll("#country#", "")
            }

            results.append($(r))
          })
        }
      })
    } else {
      $(element).find("ul").hide()
    }
  })

  $(element).on('click', 'li[data-lat]', function() {
    let lat = encodeURIComponent($(this).data('lat'))
    let lon = encodeURIComponent($(this).data('lon'))
    let city = encodeURIComponent($(this).data('city'))
    let state = encodeURIComponent($(this).data('state'))
    let country = encodeURIComponent($(this).data('country'))

    window.location.href = `./weather.html?lat=${lat}&lon=${lon}&city=${city}&country=${country}`
    $(element).find('input[type=search]').val("")
  })
}

module.exports = applySearching
