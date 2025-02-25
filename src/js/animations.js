// Reveal elements on scroll
function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Modified scroll position handling
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  const savedScrollData = JSON.parse(sessionStorage.getItem('scrollPos'));
  if (savedScrollData && savedScrollData.path === window.location.pathname) {
    window.scrollTo({
      top: parseInt(savedScrollData.position),
      behavior: 'smooth'
    });
  }
});

// Store scroll position before unload
window.addEventListener('beforeunload', () => {
  const scrollData = {
    path: window.location.pathname,
    position: window.scrollY
  };
  sessionStorage.setItem('scrollPos', JSON.stringify(scrollData));
});

// Navbar background control
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-black/80', 'backdrop-blur-md');
    navbar.classList.remove('backdrop-blur-sm');
  } else {
    navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
    navbar.classList.add('backdrop-blur-sm');
  }
});

// Counter animation
const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
  const target = +counter.dataset.target;
  let updateCount;

  // If target is less than 50, let's animate downward from 100.
  if (target < 50) {
    let count = 100;
    const decrement = (100 - target) / 100;

    updateCount = () => {
      if (count > target) {
        count -= decrement;
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    }
  } else { // Regular count up for other counters
    let count = 0;
    const increment = target / 100;

    updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    }
  }

  updateCount();
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
    }
  });
};

const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver(observerCallback, observerOptions);
counters.forEach(counter => observer.observe(counter));

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function closeMenu() {
      mobileMenu.classList.add('-translate-y-full');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('fa-times', 'rotate-180');
      icon.classList.add('fa-bars');
      
      mobileLinks.forEach(link => {
          link.classList.add('opacity-0', 'translate-y-8');
          link.classList.remove('animate__animated', 'animate__fadeInUp');
      });
  }

  function toggleMenu() {
      mobileMenu.classList.toggle('-translate-y-full');
      
      // Toggle menu icon with rotation
      const icon = menuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
      icon.classList.toggle('rotate-180');
      
      // Staggered animation for links
      if (!mobileMenu.classList.contains('-translate-y-full')) {
          mobileLinks.forEach((link, index) => {
              setTimeout(() => {
                  link.classList.remove('opacity-0', 'translate-y-8');
                  link.classList.add('animate__animated', 'animate__fadeInUp');
              }, 150 + (index * 100));
          });
      } else {
          mobileLinks.forEach(link => {
              link.classList.add('opacity-0', 'translate-y-8');
              link.classList.remove('animate__animated', 'animate__fadeInUp');
          });
      }
  }

  // Add click event listeners
  menuBtn.addEventListener('click', toggleMenu);
      mobileLinks.forEach(link => {
          link.addEventListener('click', closeMenu);
      });

  // Add this inside your existing DOMContentLoaded event listener
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('bg-black/75', 'backdrop-blur-sm');
          navbar.classList.remove('bg-transparent');
      } else {
          navbar.classList.remove('bg-black/75', 'backdrop-blur-sm');
          navbar.classList.add('bg-transparent');
      }
  });
});