//Hamburger Animation (source: W3)
//–––––––––––––––––––––––––––––––––––––––––––––––––– 
// Play
function myFunction(x) {
    x.classList.toggle("change");
  }

//Reverse

//Dropdown display (source: W3)
//––––––––––––––––––––––––––––––––––––––––––––––––––
//Open
function openDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//Close
window.onclick = function(event) {
  if (!event.target.matches('.dropBtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}