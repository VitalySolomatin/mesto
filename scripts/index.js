const elementsItem = document.querySelector('.elements');

//popupProfile
const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButtonElement = document.querySelector('.profile__button-edit');
const popupProfileButtonClose = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.popup__field_type_name');
const jobInput = popupProfile.querySelector('.popup__field_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//popupAdd
const popupAdd = document.querySelector('.popup_add-element');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddButtonClose = popupAdd.querySelector('.popup__close');
const popupAddCardTitle = popupAdd.querySelector('.popup__field_type_place');
const popupAddCardLink = popupAdd.querySelector('.popup__field_type_link');
const formAdd = popupAdd.querySelector('.popup__container');
const submitButton = popupAdd.querySelector('.popup__button-submit');

//popupImage
const popupImage = document.querySelector('.popup_image');
const popupImageButtonClose = popupImage.querySelector('.popup__close');
const popupImageElement = document.querySelector('.elements__image');
const bigImage = document.querySelector('.popup__image-full');
const bigImageText = document.querySelector('.popup__image-full-text');

const keyEscape = 'Escape';

//закрытие попапа кликом на Escape----------------------------------------
const closePopupByClickEscape = function (event, popup) {
  if (event.key === keyEscape) {
    popupActive(popup);
  }
};

//закрытие попапа кликом на оверлей----------------------------------------
const popupActive = function (popup) {
  const popupActiveElements = document.querySelectorAll('.popup_opened');
  popupActiveElements.forEach(popupActiveElement => {
    closePopup(popupActiveElement);
  })


};

const closePopupByClickOnOverlay = function (event, popupActiveElement) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupActive(popupActiveElement);

};

//открытие-закрытие всех popup--------------------------------------
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEscape);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEscape);
};

//сброс кнопки сабмита для попапа добавления карточек
const resetSubmitButtonPopupAdd = function () {
  submitButton.classList.add('popup__button-submit_inactive');
  submitButton.setAttribute('disabled', true);
}

//изменение полей profile---------------------
const submitFormProfileHandler = function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
  resetSubmitButtonPopupAdd();
}

//добавление карточек из кнопки addbutton -------------------------
const submitFormAddHandler = function (event) {
  event.preventDefault();
  elementsItem.prepend(createCard(popupAddCardTitle.value, popupAddCardLink.value));
  closePopup(popupAdd);
  event.target.reset();
  resetSubmitButtonPopupAdd();
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

//like-----------------------------------------------
function likeRender(cardElement) {
  const likeElementByClass = cardElement.querySelector('.elements__like');
  likeElementByClass.addEventListener('click', function () {
    this.classList.toggle('elements__like_active');
  })

};

//добавление карточек из массива----------------------------
function createCard(cardTitle, cardImage) {
  const cardElementTemplate = document.querySelector('#template').content;
  const cardElement = cardElementTemplate.querySelector('.elements__item').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__image');
  const cardElementTitle = cardElement.querySelector('.elements__title');

  cardElementTitle.textContent = cardTitle;
  cardElementImage.src = cardImage;
  cardElementImage.alt = cardTitle;


  likeRender(cardElement, cardTitle, cardImage);


  //удаление карточки---------------------------
  function handleDelete() {
    const trashElementbyClass = cardElement.querySelector('.elements__trash');
    trashElementbyClass.addEventListener('click', function () {
      const itemElement = this.closest('.elements__item');
      itemElement.remove();
    })



  };

  handleDelete();

  //открытие картинки ------------------------------
  function openPopupImageContainer() {
    const itemElement = cardElement.querySelector('.elements__image');
    itemElement.addEventListener('click', function () {
      openPopup(popupImage);
      bigImage.src = this.src;
      bigImage.alt = this.alt;
      bigImageText.textContent = this.alt;
    })

  };

  openPopupImageContainer();


  return cardElement;
}



function renderItems(initialCards) {
  initialCards.forEach((item) => {
    elementsItem.append(createCard(item.name, item.link));
  });
};


renderItems(initialCards);



//обработчики событий--------------------------------------------

popupProfileOpenButtonElement.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});
popupAddOpenButtonElement.addEventListener('click', () => openPopup(popupAdd));


popupProfileButtonClose.addEventListener('click', () => closePopup(popupProfile));
popupAddButtonClose.addEventListener('click', () => closePopup(popupAdd));
popupImageButtonClose.addEventListener('click', () => closePopup(popupImage));


formProfile.addEventListener('submit', submitFormProfileHandler);
formAdd.addEventListener('submit', submitFormAddHandler);


popupProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupImage.addEventListener('click', closePopupByClickOnOverlay);
