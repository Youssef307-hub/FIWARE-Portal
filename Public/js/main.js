const sections = document.querySelectorAll('section');

const navBar = document.getElementById('navbar__list');

function activeSection() {
  document.addEventListener('scroll', function () {
      var scrollPos = $(document).scrollTop();
      sections.forEach(function (section) {
          const position = section.getBoundingClientRect();
          if ((position.top >= 0 && position.top <= scrollPos)) {
              section.classList.add("active");
          } else {
              section.classList.remove("active");
          }
      })
  })
}

function scrollToSection() {

  const activeLinks = document.getElementsByClassName("active");
  
      navBar.addEventListener('click', function (e) {
          sections.forEach(function (section) { 
              const targetSection = document.getElementById(e.target.getAttribute('data-id'))
              targetSection.scrollIntoView({ behavior: "smooth" }) 
      })
      if(activeLinks.length > 0){
          activeLinks[0].classList.remove('active');
      }
      e.target.classList.add('active');
  })
}

scrollToSection();

activeSection();