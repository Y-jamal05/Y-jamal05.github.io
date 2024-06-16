document.addEventListener("DOMContentLoaded", function () {
    // Handle submenu collapse
    document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {
        element.addEventListener('click', function (e) {
            let nextEl = element.nextElementSibling;
            let parentEl = element.parentElement;

            if (nextEl && !element.classList.contains('lang-toggle')) {
                e.preventDefault();
                let myCollapse = new bootstrap.Collapse(nextEl, {
                    toggle: false
                });

                if (nextEl.classList.contains('show')) {
                    myCollapse.hide();
                } else {
                    myCollapse.show();
                    // Close other open submenus
                    let openedSubmenu = parentEl.parentElement.querySelector('.submenu.show');
                    if (openedSubmenu && openedSubmenu !== nextEl) {
                        new bootstrap.Collapse(openedSubmenu, {
                            toggle: false
                        }).hide();
                    }
                }
            }
        });
    });

    // Function to toggle language
    document.querySelector('.lang-toggle[data-language]').addEventListener('click', function () {
        let currentLanguage = this.getAttribute("data-language");
        let newLanguage = currentLanguage === 'english' ? 'dutch' : 'english';
        this.setAttribute("data-language", newLanguage);
        localStorage.setItem('language', newLanguage);
        updateLanguage(newLanguage);
    });

    // Function to update language based on stored value
    function updateLanguage(language) {
        document.querySelectorAll('.lang-toggle').forEach(function (element) {
            let dutchText = element.getAttribute('data-dutch');
            let englishText = element.getAttribute('data-english');
            element.textContent = (language === 'english') ? englishText : dutchText;
        });
    }

    // Initialize language based on stored value or default to English
    let currentLanguage = localStorage.getItem('language');
    if (currentLanguage) {
        updateLanguage(currentLanguage);
    } else {
        localStorage.setItem('language', 'english');
        updateLanguage('english');
    }

    // Slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');

    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[index].style.display = 'block';
        slideIndex = (index + 1) % slides.length;
    }

    function startSlideshow() {
        showSlide(slideIndex);
        setTimeout(startSlideshow, 2000); // Change image every 2 seconds
    }
    startSlideshow();
});
