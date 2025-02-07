function createCard(cardData, deleteCard, likeCard, openCard) {
  const cardTemplate = document.getElementById("card-template");
  const cardTemplateClone = cardTemplate.content.cloneNode(true);

  const card = cardTemplateClone.querySelector(".places__item");

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
      deleteCard(card);
  });

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', openCard);

  return card;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(evt) {
  evt.currentTarget.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};