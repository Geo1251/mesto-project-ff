import '../pages/index.css'
import initialCards from './cards.js'
import {createCard, deleteCard, likeCard} from './card.js';
import { openPopup, closePopup } from './modal.js';

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

function openCard(evt) {
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    popupImage.src = evt.currentTarget.src;
    popupImage.alt = evt.currentTarget.alt;
    popupCaption.textContent = evt.currentTarget.alt;
    openPopup(popupTypeImage);
}

initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard, likeCard, openCard); 
    placesList.append(card); 
});

profileEditBtn.addEventListener('click', () => {
    openPopup(popupTypeEdit);
    editProfileFormName.value = profileTitle.textContent;
    editProfileFormDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = editProfileFormName.value;
    profileDescription.textContent = editProfileFormDescription.value;
    closePopup(popupTypeEdit);
});

profileAddBtn.addEventListener('click', () => {
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
});
  