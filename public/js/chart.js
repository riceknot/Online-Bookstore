let activeElement = document.querySelectorAll('.nav-item a');
activeElement.forEach((element) => {
    element.addEventListener('click', () => {
        // Remove 'selected' class from all elements
        activeElement.forEach((e) => {
            e.classList.remove('selected');
        });
        // Add 'selected' class to the clicked element
        element.classList.add('selected');
    });
});

let tabsNotHome = document.querySelectorAll('.nav-item:not(.home)');
let homePage = document.querySelector('#home-page');
tabsNotHome.forEach((tab) => {
    tab.addEventListener('click', () => {
        homePage.classList.add('d-none');
    });
});

let tabHome = document.querySelector('.home');
tabHome.addEventListener('click', () => {
    homePage.classList.remove('d-none');
});

// Using jQurey for making charts and reponsive side menu
(function ($) {
    "use strict";

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar').toggleClass("open");
        return false;
    });

    $('.sidebar-toggler').click(function () {
        $('.sidebar-toggler').toggleClass("toggler-open");
        return false;
    });

    $(document).ready(function () {

        // Check window size on page load
        checkWindowSize();

        // Check window size on resize
        $(window).resize(function () {
            checkWindowSize();
        });

        function checkWindowSize() {
            var windowWidth = $(window).width();

            if (windowWidth < 991.99) {
                $('.nav-link').click(function () {
                    $('.sidebar').toggleClass("open");
                    $('.sidebar-toggler').toggleClass("toggler-open");
                });
            }
            return false;
        }

    });
})(jQuery);
