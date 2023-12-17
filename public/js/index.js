const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
        password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the eye slash icon
    if (this.classList.contains("fa-eye")) {
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
});

// set profile picture

const imgDiv = document.querySelector(".profile_pic");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#upload_button");

uploadBtn.style.display = "block";

file.addEventListener("change", function () {
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            document.querySelector("#photo").setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
    }
});

form.addEventListener("submit", function (e) {
    const choosedFile = file.files[0];

    if (!choosedFile) {
        alert("Please choose a profile picture before submitting the form.");
        e.preventDefault();
    }
});





function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}



/*


 _____    _ _ _                                                                       _   
| ____|__| (_) |_    __ _ _ __  _ __   ___  _   _ _ __   ___ ___ _ __ ___   ___ _ __ | |_ 
|  _| / _` | | __|  / _` | '_ \| '_ \ / _ \| | | | '_ \ / __/ _ \ '_ ` _ \ / _ \ '_ \| __|
| |__| (_| | | |_  | (_| | | | | | | | (_) | |_| | | | | (_|  __/ | | | | |  __/ | | | |_ 
|_____\__,_|_|\__|  \__,_|_| |_|_| |_|\___/ \__,_|_| |_|\___\___|_| |_| |_|\___|_| |_|\__|



*/




document.addEventListener('DOMContentLoaded', function () {
    toggleEdit();
});

function toggleEdit() {
    var titleInput = document.getElementById('exampleFormControlInput1');
    var contentTextarea = document.getElementById('exampleFormControlTextarea1');
    var editButton = document.querySelector('.btn-primary');

    if (titleInput.readOnly) {
        // Enable editing
        titleInput.readOnly = false;
        contentTextarea.readOnly = false;
        titleInput.classList.add('editable');
        contentTextarea.classList.add('editable');
        editButton.textContent = 'Edit';
    } else {
        // Disable editing
        titleInput.readOnly = true;
        contentTextarea.readOnly = true;
        titleInput.classList.remove('editable');
        contentTextarea.classList.remove('editable');
        editButton.textContent = 'Edit';
    }
}





