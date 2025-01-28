const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCard) {
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

    return card;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard); 
  placesList.appendChild(card); 
});
