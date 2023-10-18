function toggleMenu() {
    const navList = document.getElementById('navList');
    navList.classList.toggle('show');
}



let isImage1Visible = true;

function toggleImage() {
  const button = document.querySelector('.image-button');

  if (isImage1Visible) {
    button.style.backgroundImage = 'url("image/done.svg")';
  } else {
    button.style.backgroundImage = 'url("image/plus.svg")';
  }

  isImage1Visible = !isImage1Visible;
}