function selectItem(item, event) {
    event.preventDefault(); // Prevent the default behavior of the dropdown
    // Remove the 'selected-item' class from all items
    document.querySelectorAll('.dropdown-menu a').forEach(function (el) {
        el.classList.remove('selected-item');
    });

    // Add the 'selected-item' class to the clicked item
    item.classList.add('selected-item');

    // Update the button text with the selected item text
    document.getElementById('dropdownButton').innerText = item.innerText;
}



/*Change pfp in user profile*/
document.addEventListener('DOMContentLoaded', function () {
    var fileTag = document.getElementById("filetag");
    var preview = document.getElementById("preview");

    preview.addEventListener("click", function () {
        fileTag.click();
    });

    fileTag.addEventListener("change", function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Image loaded: ", e.target.result); // Debugging
            preview.src = e.target.result;
        }
        console.log("File selected: ", this.files[0]); // Debugging
        reader.readAsDataURL(this.files[0]);
    });
});

