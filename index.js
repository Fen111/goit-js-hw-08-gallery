import galleryItems from './app.js';

console.log(galleryItems);
const galleryRef = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.lightbox');
const imageInsideModalWindow = document.querySelector('.lightbox__image');
const closeModalButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const backdrop = document.querySelector('.lightbox__overlay');

// Создание и рендер разметки по массиву данных

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
      <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `;
    })
    .join('');
}

const galleryMarkup = createGalleryItems(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryRef.addEventListener('click', onClick);

// Открытие модального окна по клику на элементе галереи.

function onClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();
  openModalWindow();
  imageInsideModalWindow.src = e.target.dataset.source;
}

function openModalWindow() {
  window.addEventListener('keydown', onEscKeyPress);
  modalWindow.classList.add('is-open');
}

// Закрытие модального окна

function closeModalWindow() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', scrollImages);

  modalWindow.classList.remove('is-open');
}

// Закрытие кнопкой
closeModalButton.addEventListener('click', closeModalWindow);
// Закрытие по клику в бекдропе
backdrop.addEventListener('click', closeModalWindow);
// Закрытие кликая Escape
window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
}

window.addEventListener('keydown', scrollImages);

// Скролл картинок

function scrollImages(e) {
  const originalImages = galleryItems.map(({ original }) => original);
  let newPlace = originalImages.indexOf(imageInsideModalWindow.src);
  console.log(newPlace);
  if (e.code === 'ArrowRight') {
    newPlace += 1;
    // console.log(originalImages);
    // console.log(imageInsideModalWindow.src);
    // console.log(originalImages.indexOf(imageInsideModalWindow.src));
    // let newPlace = originalImages.indexOf(imageInsideModalWindow.src) + 1;

    // console.log(originalImages[newPlace]);
    imageInsideModalWindow.src = originalImages[newPlace];
  }
  if (e.code === 'ArrowLeft') {
    newPlace -= 1;
    imageInsideModalWindow.src = originalImages[newPlace];
  }
}
