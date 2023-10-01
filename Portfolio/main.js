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

const navLinks = document.querySelectorAll(".nav-link");

  /// Function to determine if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
  // Function to update active link based on the section in view
  function updateActiveLink() {
    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href").substring(1);
      const section = document.getElementById(sectionId);
  
      if (isInViewport(section)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  
  // Add a scroll event listener to update active link on scroll
  window.addEventListener("scroll", updateActiveLink);
  
  // Call the function initially to set the correct active link on page load
  updateActiveLink();



  
  



  