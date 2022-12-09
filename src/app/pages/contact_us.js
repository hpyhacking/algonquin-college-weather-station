$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "contact_us") {
    return 
  }

  //validate the profile form
  function validate(e) {
      e.preventDefault();
      var valid = true;

      //display warning if name is not entered
      if (profile.name.value.trim() === "") {
        $("#nameWarning").text ("*Please enter your name*");
          valid = false;
      }

      // // display warning if pronoun is not selected
      if (profile.pronoun.options.selectedIndex === 0) {
          valid = false;
          $("#pronounWarning").text ( "*Please select your pronoun*");
      }

      //display warning if phone is not vaild
      const phone_regex = /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/

      let phone = $("#phone").val()
      if (phone_regex.test(phone) == false)  {
          $('#phoneWarning').text ( "*This is not a vaild phone*");
          valid = false;
      }

      //display warning if department is not checked
      const radios = $('[name = "department"]');
          var checked = false
          for (var i = 0, l = radios.length; i < l; i++) {
              if (radios[i].checked) {
                  checked = true
                  break
              }
          }
          if (checked == false) {
              valid = false;
              $('#departmentWarning').text ("*Department is required*");
          }

      //display warning if information is not entered
      if (profile.describe.value.trim() == "") {
        $('#describeWarning').text("Please describe information*");
            valid = false;
          }

      //validate email
      const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      let email = $("#email").val()
      if (EMAIL_REGEX.test(email) == false) {
        valid = false;
        $('#emailWarning').text ("*This is not a vaild email*");
      }
   
      // valid than submit
      if (valid) {
          alert("Submit successfully!");
        window.location.href="https://hpyhacking.github.io/algonquin-college-weather-station/contact_us.html";
      } 

    }



  /*                                                     events                                                        */
  //remove warning if name has input
  $('#name').blur(function () {
      if (this.value !== "") {
        $("#nameWarning").text ("") ;
      }
  });

  //*remove warning if pronoun has selected
  $('#pronoun').blur(function () {
      if (profile.pronoun.options.selectedIndex !== 0) {
        $("#pronounWarning").text ("");
      }
  });

  //remove warning if phone is vaild
  const phone_regex = /^\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/
  let phone = $("#phone").val()
  $('#phone').blur(function() {
      if (phone_regex.test(phone) == true)  {
        $('#phoneWarning').text ("");
      }
  });

  //remove warning if email is vaild
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let email = $("#email").val()
  $('#email').blur(function () {
      if (EMAIL_REGEX.test(email) == true)  {
        $('#emailWarning').text ("");
      }
  });

  //remove warning if department selected has input
  $('[name = "department"]')[0].blur(function () {
      if (this.checked) {
        $('#departmentWarning').text ("");
      }
  });
  $('[name = "department"]')[1].blur(function () {
      if (this.checked) {
        $('#departmentWarning').text ("");
      }
  });
  $('[name = "department"]')[2].blur(function () {
      if (this.checked) {
        $('#departmentWarning').text ("");
      }
  });
  $('[name = "department"]')[3].blur(function () {
      if (this.checked) {
        $('#departmentWarning').text ("");
      }
  });

  //remove warning if describe information has input
  $('#describe').blur(function () {
      if (this.value.trim() !== "") {
        $('#describeWarning').text ("");
      }
  });

  // Add an event to the form on submit to validate input
  document.profile.addEventListener("submit", validate);
  
  // Add an event to the form on reset to clear warning
  $("#reset").click(function(){  
    $(".alert").text("");
  })



  
})








