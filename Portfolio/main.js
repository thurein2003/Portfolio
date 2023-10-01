const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// Function to determine if an element is in the viewport
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to update the active link
  function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      
      if (section && isElementInViewport(section)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Add a scroll event listener to update active link on scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Call the function initially to set the correct active link on page load
  updateActiveLink();
  


  