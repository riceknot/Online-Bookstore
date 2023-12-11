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

