//remove warning if name has input
document.querySelector('#name').addEventListener("blur", function () {
    if (this.value !== "") {
        nameWarning.textContent = "";
        name.style.borderColor = ''
    }
});

//*remove warning if pronoun has selected
document.querySelector('#pronoun').addEventListener("blur", function () {
    if (profileForm.pronoun.options.selectedIndex !== 0) {
        pronounWarning.textContent = "";
        pronoun.style.borderColor = ''
    }
});

//remove warning if phone has input
document.querySelector('#contactPhone').addEventListener("blur", function () {
    if ((this.value !== "")&&(this.value.match(/^\d+/))&&(this.length === 10))  {
        contactPhoneWarning.textContent = "";
        contactPhone.style.borderColor = ''
    }
});

//remove warning if email has input
document.querySelector('#email').addEventListener("blur", function () {
    if (this.value !== "")  {
        emailWarning.textContent = "";
        email.style.borderColor = ''
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
        describe.style.borderColor = ''
    }
});

// change warning if input is not number
document.querySelector('#phone').addEventListener("blur", function () {
    if ((!this.value.match(/^\d+/)) &&(this.value.length === 10)) {
        document.querySelector('#phoneWarning').textContent = '*Phone should be numbers*';
    }
})

// change warning if input is not 10 digits
document.querySelector('#phone').addEventListener("blur", function () {
    if ((this.value.match(/^\d+/)) &&(this.value.length !== 10)) {
        document.querySelector('#phoneWarning').textContent = '*Phone should be 10 digits*';
    }
})

// Add an event to the form on submit to validate input
document.profileForm.addEventListener("submit", validate);