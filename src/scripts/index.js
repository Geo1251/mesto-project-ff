import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards } from './api.js';

const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormDescription = editProfileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms['new-place'];
const newPlaceFormName = newPlaceForm.elements['place-name'];
const newPlaceFormLink = newPlaceForm.elements.link;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

function openCard(evt) {
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    popupImage.src = evt.currentTarget.src;
    popupImage.alt = evt.currentTarget.alt;
    popupCaption.textContent = evt.currentTarget.alt;
    openPopup(popupTypeImage);
}

getInitialCards()
  .then(initialCards => {
    initialCards.forEach((cardData) => {
        const card = createCard(cardData, deleteCard, likeCard, openCard); 
        placesList.append(card); 
    });
  })
  .catch(error => {
    console.error(error);
  });

profileEditBtn.addEventListener('click', () => {
    clearValidation(editProfileForm, validationConfig);
    editProfileFormName.value = profileTitle.textContent;
    editProfileFormDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
});

editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = editProfileFormName.value;
    profileDescription.textContent = editProfileFormDescription.value;
    closePopup(popupTypeEdit);
});

profileAddBtn.addEventListener('click', () => {
    clearValidation(newPlaceForm, validationConfig);
    openPopup(popupTypeNewCard);
});

newPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard({
        name: newPlaceFormName.value,
        link: newPlaceFormLink.value
    }, deleteCard, likeCard, openCard);
    placesList.prepend(newCard);
    closePopup(popupTypeNewCard);
    newPlaceForm.reset();
    clearValidation(newPlaceForm, validationConfig);
});

enableValidation(validationConfig);