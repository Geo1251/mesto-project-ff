function createCard(cardData, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
    const cardTemplate = document.getElementById("card-template");
    const cardTemplateClone = cardTemplate.content.cloneNode(true);

    const card = cardTemplateClone.querySelector(".places__item");

    const cardImage = card.querySelector(".card__image");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const cardTitle = card.querySelector(".card__title");
    cardTitle.textContent = cardData.name;

    const likeCounter = card.querySelector('.card__like-counter');
    likeCounter.textContent = cardData.likes.length;

    const likeButton = card.querySelector('.card__like-button');
    if (cardData.likes.some(like => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => handleLikeClick(cardData._id, likeButton, likeCounter));

    const deleteButton = card.querySelector(".card__delete-button");
    if (cardData.owner._id !== userId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener("click", () => handleDeleteClick(cardData._id, card));
    }

    cardImage.addEventListener('click', () => handleCardClick(cardData));

    return card;
}

export { createCard };