function escHandler(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}
  
function clickHandler(evt) {
    if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup__close")
    ) {
        closePopup(evt.currentTarget);
    }
}
  
function openPopup(popupElement) { 
    popupElement.classList.add('popup_is-opened');

    document.addEventListener('keydown', escHandler);
    popupElement.addEventListener('click', clickHandler);
}
  
function closePopup(popupElement) { 
    popupElement.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', escHandler);
    popupElement.removeEventListener('click', clickHandler);
}
  
export { openPopup, closePopup };
