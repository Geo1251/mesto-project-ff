import '../pages/index.css';
import { createCard, setUserId } from './card.js';
import { openPopup, closePopup, loadingPopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getUserData, updateUserProfile, addNewCard, updateAvatar } from './api.js';

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
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const avatarEditBtn = document.querySelector(".profile__image");
const newAvatarForm = document.forms['new-avatar'];
const profileAvatar = document.querySelector(".profile__avatar");

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

Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.src = userData.avatar;
        setUserId(userData._id);

        initialCards.forEach((cardData) => {
            const card = createCard(cardData, openCard); 
            placesList.append(card); 
        });
    })
    .catch(error => {
        console.log(error);
});

profileEditBtn.addEventListener('click', () => {
    clearValidation(editProfileForm, validationConfig);
    editProfileFormName.value = profileTitle.textContent;
    editProfileFormDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
});

editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    loadingPopup(popupTypeEdit, true);
    updateUserProfile(editProfileFormName.value, editProfileFormDescription.value)
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopup(popupTypeEdit);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loadingPopup(popupTypeEdit, false);
      });
});

avatarEditBtn.addEventListener('click', () => {
    clearValidation(newAvatarForm, validationConfig);
    openPopup(popupTypeAvatar);
});

profileAddBtn.addEventListener('click', () => {
    clearValidation(newPlaceForm, validationConfig);
    openPopup(popupTypeNewCard);
});

newPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    loadingPopup(popupTypeNewCard, true);
    addNewCard(newPlaceFormName.value, newPlaceFormLink.value)
      .then((cardData) => {
        const newCard = createCard(cardData, openCard);
        placesList.prepend(newCard);
        closePopup(popupTypeNewCard);
        newPlaceForm.reset();
        clearValidation(newPlaceForm, validationConfig);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loadingPopup(popupTypeNewCard, false);
      });
});

newAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    loadingPopup(popupTypeAvatar, true);
    updateAvatar(newAvatarForm.elements['avatar-link'].value)
      .then((userData) => {
        profileAvatar.src = userData.avatar;
        closePopup(popupTypeAvatar);
        newAvatarForm.reset();
        clearValidation(newAvatarForm, validationConfig);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loadingPopup(popupTypeAvatar, false);
      });
});

enableValidation(validationConfig);