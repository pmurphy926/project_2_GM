//Hamburger Nav and Dropdown
//–––––––––––––––––––––––––––––––––––––––––––––––––– 
const dropdown = document.getElementById("hamburger")

function toggleDropdown () {
  const hamburger = document.getElementById("hamburger");
  const dropdownContent = document.getElementById("myDropdown");
  hamburger.classList.toggle("change");
  dropdownContent.classList.toggle("show");
}

dropdown.addEventListener("click", toggleDropdown);