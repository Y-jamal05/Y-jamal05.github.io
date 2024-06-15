document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.sidebar .nav-link').forEach(function(element){
      
      element.addEventListener('click', function (e) {
  
        let nextEl = element.nextElementSibling;
        let parentEl  = element.parentElement;	
  
          if(nextEl) {
              e.preventDefault();	
              let mycollapse = new bootstrap.Collapse(nextEl);
              
              if(nextEl.classList.contains('show')){
                mycollapse.hide();
              } else {
                  mycollapse.show();
                  // find other submenus with class=show
                  let opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                  // if it exists, then close all of them
                  if(opened_submenu){
                    new bootstrap.Collapse(opened_submenu);
                  }
              }
          }
      }); // addEventListener
    }) // forEach
  }); // DOMContentLoaded  end

  document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle language
    document.querySelector('.lang-toggle').addEventListener('click', function () {
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
});

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

function nextSlide() {
    showSlide((slideIndex + 1) % slides.length);
}

function prevSlide() {
    showSlide((slideIndex - 1 + slides.length) % slides.length);
}

// Initialize the slideshow
startSlideshow();

