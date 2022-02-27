//открытие/закрытие popap--------------------------------------------------------------
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__field_type_name');
const jobInput = formElement.querySelector('.popup__field_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const itemTemplateContent = document.querySelector('#template');
const elementsItem = document.querySelector('.elements');

const popupAddElement = document.querySelector('#container-add-element');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const formAddElement = document.querySelector('#formAdd');
const placeInput = document.querySelector('.popup__field_type_place');
const linkInput = document.querySelector('.popup__field_type_link');


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


//открытие popup addbutton--------------------------------------
const openPopupAdd = function() {
    popupAddElement.classList.add('popup_opened');
};

const closePopupAdd = function() {
    popupAddElement.classList.remove('popup_opened');
};


//добавление карточек из массива----------------------------
function renderItem (item) {
    const itemElement = itemTemplateContent.content.cloneNode(true);
    itemElement.querySelector('.elements__image').src = item.link;
    itemElement.querySelector('.elements__title').textContent = item.name;
    itemElement.querySelector('.elements__image').alt = item.name;
    elementsItem.appendChild(itemElement);
    
}

function renderItems(initialCards) {  
    initialCards.forEach(renderItem);
}

renderItems(initialCards);


//like-----------------------------------------------

const likeRender = function () {
    let likeElementByClass = document.querySelectorAll('.elements__like');
    for (let i=0, length = likeElementByClass.length; i < length; i++){
    likeElementByClass[i].addEventListener('click', function() {
    this.classList.toggle('elements__like_active');

}
    );
}
}

likeRender();

//добавление карточек из кнопки addbutton -------------------------

const formSubmitSaveHandler = function (event) {
    event.preventDefault();
    likeRender();
    const card = itemTemplateContent.content.cloneNode(true);
    card.querySelector('.elements__image').src = linkInput.value;
    card.querySelector('.elements__title').textContent = placeInput.value;
    card.querySelector('.elements__image').alt = placeInput.value;
    elementsItem.prepend(card);
    likeRender();
    closePopupAdd();
    handleDelete();
    openPopupImageContainer();
 
}

//открытие popup------------------------------------

const openPopup = function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupElement.classList.add('popup_opened');
};

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
};

//изменение полей profile---------------------

const formSubmitHandler = function (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

//удаление карточки---------------------------

const handleDelete = function (event) {
  let trashElementbyClass = document.querySelectorAll('.elements__trash');
    for (let i=0, length = trashElementbyClass.length; i < length; i++) {
      trashElementbyClass[i].addEventListener('click', function() {
        const itemElement = this.closest('.elements__item');
        itemElement.remove();
    })
 
  }

  };

handleDelete();

//открытие картинки ------------------------------

const popupImageContainer = document.querySelector('#container-image');
const popupImageElement = document.querySelector('.elements__image');
const closePopupImageElement = document.querySelector('.popup__close');
const bigImage = document.querySelector('#bigImage');
const bigImageText = document.querySelector('#bigImageText');
const popupBigImageCloseButtonElement = popupImageContainer.querySelector('.popup__close');

const openPopupImageContainer = function(event) {
  let itemElement = document.querySelectorAll('.elements__image');
  for (let i=0, length = itemElement.length; i < length; i++) {
  itemElement[i].addEventListener('click', function() {
  popupImageContainer.classList.add('popup_opened');
  bigImage.src = this.src;
  bigImageText.textContent = this.alt;

  }
  )}
};

openPopupImageContainer();


const closePopupImageFull = function() {
  popupImageContainer.classList.remove('popup_opened');
};


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
popupAddOpenButtonElement.addEventListener('click', openPopupAdd);
popupAddCloseButtonElement.addEventListener('click', closePopupAdd);
formAddElement.addEventListener('submit', formSubmitSaveHandler);
popupImageElement.addEventListener('click', openPopupImageContainer);
popupBigImageCloseButtonElement.addEventListener('click', closePopupImageFull);
