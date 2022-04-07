export class Card {
  constructor(name, link, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.elements__item');
    this._handleCardClick = handleCardClick;
  };


  _getTemplate() {

    this._cardElement = this._cardTemplate.cloneNode(true);

    return this._cardElement;
  };

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardElementImage = this._element.querySelector('.elements__image');
    const cardElementTitle = this._element.querySelector('.elements__title');

    cardElementTitle.textContent = this._name;
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;

    return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._handleDelete();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  };

  _handleLike() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active')
  };

  _handleDelete() {
    const itemElement = this._element.closest('.elements__item');
    itemElement.remove();
  };


}