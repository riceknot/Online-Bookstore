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