document.addEventListener('DOMContentLoaded', function() {
  let menuIcon = document.querySelector('.menuIcon');
  let nav = document.querySelector('.overlay-menu');
  let toggleIcon = document.querySelector('.menuIcon');

  menuIcon.addEventListener('click', () => {
      nav.style.transform = (nav.style.transform === 'translateX(0%)') ? 'translateX(-100%)' : 'translateX(0%)';
      nav.style.transition = 'transform 0.2s ease-out';
  });

  toggleIcon.addEventListener('click', () => {
      toggleIcon.classList.toggle('toggle');
  });

  var links = document.querySelectorAll('#menu a');

  links.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault();

          var targetId = this.getAttribute('href').substring(1);
          var targetElement = document.getElementById(targetId);

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });

              // Close the menu on item click (optional)
              nav.style.transform = 'translateX(-100%)';
              toggleIcon.classList.remove('toggle');
          }
      });
  });
});
