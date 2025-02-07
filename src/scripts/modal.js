function openPopup(popupElement) {
  popupElement.classList.toggle('popup_is-opened');

  function escHandler(evt) {
      if (evt.key === 'Escape') {
          removeListeners();
          closePopup(popupElement);
      }
  }

  function clickHandler(evt) {
      if (evt.target === popupElement || evt.target.classList.contains('popup__close')) {
          removeListeners();
          closePopup(popupElement);
      }
  }

  function removeListeners() {
      document.removeEventListener('keydown', escHandler);
      popupElement.removeEventListener('click', clickHandler);
  }

  document.addEventListener('keydown', escHandler);
  popupElement.addEventListener('click', clickHandler);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

export {openPopup, closePopup};