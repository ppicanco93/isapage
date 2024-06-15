const menuButton = document.querySelector('.menu-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});


// Close the dropdown when an option is clicked
dropdownMenu.addEventListener('click', () => {
    if(window.innerWidth < 900){
        menuButton.classList.toggle('active');
        dropdownMenu.style.display = 'none';
    }
});

// Handle window resize event
window.addEventListener('resize', () => {
    if(menuButton.classList.contains('active')) {
        menuButton.classList.toggle('active');
      }
    if (window.innerWidth < 900) {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });

const header = document.querySelector('header');
let prevScrollpos = window.scrollY;

window.onscroll = function() {
  const currentScrollPos = window.scrollY;

  if(menuButton.classList.contains('active')) {
    menuButton.classList.toggle('active');
    dropdownMenu.style.display = 'none';
  }

  if (prevScrollpos > currentScrollPos) {
    // Scrolling up
    header.classList.remove('hidden');
    header.classList.add('visible');
  } else {
    // Scrolling down
    header.classList.remove('visible');
    header.classList.add('hidden');
  }

  prevScrollpos = currentScrollPos;
};