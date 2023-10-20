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


const gallery = document.querySelector('.gallery');
const blocks = document.querySelectorAll('.block');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentBlockIndex = 0;

// Функція для анімації з'явлення блоку
function animateInBlock(index) {
  blocks[index].style.transform = 'translateX(0)';
  setTimeout(() => {
    blocks[index].style.opacity = 1;
    blocks[index].classList.remove('hidden');
  }, 10);
}

// Запустити анімацію для першого блоку при завантаженні сторінки
animateInBlock(currentBlockIndex);

nextButton.addEventListener('click', () => {
  blocks[currentBlockIndex].style.transform = 'translateX(-100%)';
  blocks[currentBlockIndex].style.opacity = 0;
  setTimeout(() => {
    blocks[currentBlockIndex].classList.add('hidden');
    currentBlockIndex = (currentBlockIndex + 1) % blocks.length;
    animateInBlock(currentBlockIndex);
  }, 500);
});

prevButton.addEventListener('click', () => {
  blocks[currentBlockIndex].style.transform = 'translateX(100%)';
  blocks[currentBlockIndex].style.opacity = 0;
  setTimeout(() => {
    blocks[currentBlockIndex].classList.add('hidden');
    currentBlockIndex = (currentBlockIndex - 1 + blocks.length) % blocks.length;
    animateInBlock(currentBlockIndex);
  }, 500);
});