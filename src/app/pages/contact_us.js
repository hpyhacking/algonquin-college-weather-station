$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "contact_us") {
    return 
  }

  //validate the profile form
  function validate(e) {
      e.preventDefault();
      var valid = true;

      //display warning if name is not entered
      if (profileForm.name.value === "") {
          document.querySelector('#nameWarning').textContent = "*Please enter your name*";
          valid = false;
      }

      // // display warning if pronoun is not selected
      if (profileForm.pronoun.options.selectedIndex === 0) {
          valid = false;
          document.querySelector('#pronounWarning').textContent = "*Please select your pronoun*";
      }

      //display warning if phone is not entered
      if (profileForm.phone.value === "") {
          document.querySelector('#phoneWarning').textContent = "*Please enter your phone number*";
          valid = false;
      }

      //display warning if email is not entered
      if (profileForm.email.value === "") {
          document.querySelector('#emailWarning').textContent = "*Please enter your email*";
          valid = false;
      }

      //display warning if department is not checked
      const radios = document.querySelectorAll('[name = "department"]');
          var checked = false
          for (var i = 0, l = radios.length; i < l; i++) {
              if (radios[i].checked) {
                  checked = true
                  break
              }
          }
          if (checked == false) {
              valid = false;
              document.querySelector('#departmentWarning').textContent = "*Department is required*";
          }

      //display warning if information is not entered
      if (profileForm.describe.value == "") {
            document.querySelector('#describeWarning').textContent = "*Please describe information*";
            valid = false;
          }

      //validate number    
      const Phone = document.querySelector('#phone')
      if ((!Phone.value.match(/^\d+/))&&(profileForm.phone.value !== "")) {
          valid = false;
          document.querySelector('#phoneWarning').textContent = "*Phone should be numbers*";
      }

      // validate 10 digits
      if ((Phone.value.length !== 10)&&(profileForm.phone.value !== "")) {
          valid = false;
          document.querySelector('#phoneWarning').textContent = "*Phone should be 10 digits*";
      }

      //validate email
      const Email = document.querySelector('#email').value; 
      if (Email.indexOf("@") < 1 || Email.lastIndexOf(".") < Email.indexOf("@") + 2 || Email.lastIndexOf(".")+2 >= Email.length) { 
          valid = false;
          document.querySelector('#emailWarning').textContent = "*This is not a vaild email*";
      }

      // valid than submit
      if (valid) {
          alert("Submit successfully!");
        window.location.href="http://127.0.0.1:8080/contact_us.html";
      } 

    }



  /*                                                     events                                                        */
  //remove warning if name has input
  document.querySelector('#name').addEventListener("blur", function () {
      if (this.value !== "") {
          nameWarning.textContent = "";
      }
  });

  //*remove warning if pronoun has selected
  document.querySelector('#pronoun').addEventListener("blur", function () {
      if (profileForm.pronoun.options.selectedIndex !== 0) {
          pronounWarning.textContent = "";
      }
  });

  //remove warning if phone has input
  document.querySelector('#phone').addEventListener("blur", function () {
      if (this.value !== "")  {
          phoneWarning.textContent = "";
      }
  });

  //remove warning if email has input
  document.querySelector('#email').addEventListener("blur", function () {
      if (this.value !== "")  {
          emailWarning.textContent = "";
      }
  });

  //remove warning if department selected has input
  document.querySelectorAll('[name = "department"]')[0].addEventListener("blur", function () {
      if (this.checked) {
          document.querySelector('#departmentWarning').textContent = '';
      }
  });
  document.querySelectorAll('[name = "department"]')[1].addEventListener("blur", function () {
      if (this.checked) {
          document.querySelector('#departmentWarning').textContent = '';
      }
  });
  document.querySelectorAll('[name = "department"]')[2].addEventListener("blur", function () {
      if (this.checked) {
          document.querySelector('#departmentWarning').textContent = '';
      }
  });
  document.querySelectorAll('[name = "department"]')[3].addEventListener("blur", function () {
      if (this.checked) {
          document.querySelector('#departmentWarning').textContent = '';
      }
  });

  //remove warning if describe information has input
  document.querySelector('#describe').addEventListener("blur", function () {
      if (this.value !== "") {
          describeWarning.textContent = "";
      }
  });

  // change warning if phone is not number
  document.querySelector('#phone').addEventListener("blur", function () {
      if ((!this.value.match(/^\d+/)) &&(this.value.length === 10)) {
          document.querySelector('#phoneWarning').textContent = '*Phone should be numbers*';
      }
  })

  // change warning if phone is not 10 digits
  document.querySelector('#phone').addEventListener("blur", function () {
      if ((this.value.match(/^\d+/)) &&(this.value.length !== 10)) {
          document.querySelector('#phoneWarning').textContent = '*Phone should be 10 digits*';
      }
  })

  // Add an event to the form on submit to validate input
  document.profileForm.addEventListener("submit", validate);

  // Add an event to the form on reset to clear input and warning
  function reset() {
    document.querySelector('#nameWarning').textContent = "";
    document.querySelector('#pronounWarning').textContent = "";
    document.querySelector('#phoneWarning').textContent = "";
    document.querySelector('#emailWarning').textContent = "";
    document.querySelector('#departmentWarning').textContent = "";
    document.querySelector('#describeWarning').textContent = "";
  }

  $("#reset").click(function(){  
    $(".alert alert-danger").text("");
  })



  
})








