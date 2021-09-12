export default {
  gallery: document.querySelector('.js-gallery'),
  modalWindow: document.querySelector('.lightbox'),
  imageInsideModalWindow: document.querySelector('.lightbox__image'),
  closeModalButton: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  backdrop: document.querySelector('.lightbox__overlay'),
};
