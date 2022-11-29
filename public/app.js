// //Hamburger Nav and Dropdown
// //–––––––––––––––––––––––––––––––––––––––––––––––––– 
const dropdown = document.getElementById("hamburger")

function toggleDropdown () {
  const hamburger = document.getElementById("hamburger");
  const dropdownContent = document.getElementById("myDropdown");
  hamburger.classList.toggle("change");
  dropdownContent.classList.toggle("show");
}

dropdown.addEventListener("click", toggleDropdown);

/* Carousel
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// let numberOfImages = $('.carousel-images').children().length - 1;
// let currentImageIndex = 0;

// $('#right').on('click', () => {
//     $('.carousel-images').children().eq(currentImageIndex).css('display', 'none');
//     if (currentImageIndex < numberOfImages) {
//         currentImageIndex++
//     } else {
//         currentImageIndex = 0
//     }
//     $('.carousel-images').children().eq(currentImageIndex).css('display', 'block');
// })

// $('#left').on('click', () => {
//     $('.carousel-images').children().eq(currentImageIndex).css('display', 'none');
//     if (currentImageIndex > 0) {
//         currentImageIndex--
//     } else {
//         currentImageIndex = numberOfImages
//     } 
//     $('.carousel-images').children().eq(currentImageIndex).css('display', 'block');

// })