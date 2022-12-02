//validate the profile form
function validate(e) {
    e.preventDefault();
    var valid = true;

    //display warning if name is not entered
    if (profileForm.name.value === "") {
        document.querySelector('#nameWarning').textContent = "*Please enter your name*";
        document.querySelector('#name').style.borderColor = '#ff0000'
        valid = false;
    }

    // // display warning if pronoun is not selected
    if (profileForm.pronoun.options.selectedIndex === 0) {
        valid = false;
        document.querySelector('#pronounWarning').textContent = "*Please select your pronoun*";
        document.querySelector('#pronoun').style.borderColor = '#ff0000'
    }

    //display warning if phone is not entered
    if (profileForm.phone.value == "") {
        document.querySelector('#phoneWarning').textContent = "*Please enter your phone number*";
        document.querySelector('#phone').style.borderColor = '#ff0000'
        valid = false;
    }

    //display warning if email is not entered
    if (profileForm.email.value == "") {
        document.querySelector('#emailWarning').textContent = "*Please enter your email*";
        document.querySelector('#email').style.borderColor = '#ff0000'
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
    if (document.querySelector("#describe").style.display == "block") {
        if (profileForm.describe.value == "") {
            document.querySelector('#describeWarning').textContent = "*Please describe information*";
            document.querySelector('#describe').style.borderColor = '#ff0000'
            valid = false;
        }
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
    }
    return valid;
}
