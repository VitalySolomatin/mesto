import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__field_inactive',
  errorClass: 'popup__field_active'
};

const elementsItem = document.querySelector('.elements');

//popupProfile
const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButtonElement = document.querySelector('.profile__button-edit');
const formProfile = popupProfile.querySelector('#formEdit');
const nameInput = popupProfile.querySelector('.popup__field_type_name');
const jobInput = popupProfile.querySelector('.popup__field_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popups = document.querySelectorAll('.popup')

//popupAdd
const popupAdd = document.querySelector('.popup_add-element');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddCardTitle = popupAdd.querySelector('.popup__field_type_place');
const popupAddCardLink = popupAdd.querySelector('.popup__field_type_link');
const formAdd = popupAdd.querySelector('#formAdd');

//popupImage
const popupImage = document.querySelector('.popup_image');
const bigImage = document.querySelector('.popup__image-full');
const bigImageText = document.querySelector('.popup__image-full-text');

const keyEscape = 'Escape';

const profileFormValidator = new FormValidator(validationConfig, formProfile);
const addFormValidator = new FormValidator(validationConfig, formAdd);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

//закрытие попапа кликом на Escape----------------------------------------
const closePopupByClickEscape = function (event, popup) {
  const popupActiveElements = document.querySelectorAll('.popup_opened');
  popupActiveElements.forEach(popupActiveElement => {
    if (event.key === keyEscape) {
      closePopup(popupActiveElement);
    }
  })
}

//открытие-закрытие всех popup--------------------------------------
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEscape);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEscape);
};


//изменение полей profile---------------------
const submitFormProfileHandler = function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

//добавление карточек из кнопки addbutton -------------------------
const submitFormAddHandler = function (event) {
  event.preventDefault();
  renderCard(popupAddCardTitle.value, popupAddCardLink.value);
  closePopup(popupAdd);
  event.target.reset();
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//закрытие попапа кликом на оверлей----------------------------------------
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//обработчики событий--------------------------------------------
popupProfileOpenButtonElement.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});
popupAddOpenButtonElement.addEventListener('click', () => {
  addFormValidator.resetValidation();
  openPopup(popupAdd);
})

formProfile.addEventListener('submit', submitFormProfileHandler);
formAdd.addEventListener('submit', submitFormAddHandler);


// Добавления карточек при загрузке страницы
initialCards.forEach(function (item) {
  renderCard(item.name, item.link);
})

function renderCard(name, link) {
  elementsItem.prepend(createCard(name, link));
}

function createCard(name, link) {
  const cardTemplate = new Card(name, link, '#template', handleCardClick);
  return cardTemplate.createCard()
}

function handleCardClick() {
  bigImage.src = this._link;
  bigImage.alt = this._name;
  bigImageText.textContent = this._name;
  openPopup(popupImage);
}