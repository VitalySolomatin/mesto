//открытие/закрытие popap--------------------------------------------------------------
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const popupCloseSaveElement = popupElement.querySelector('.popup__button-submit');

const openPopup = function() {
    popupElement.classList.add('popup_opened');
};

const closePopap = function() {
    popupElement.classList.remove('popup_opened');
};

const savePopap = function() {
    popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopap);
popupCloseSaveElement.addEventListener('click', savePopap);
//изменение полей profile--------------------------------------------------------------

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('input[name$="nameInput"]');
let jobInput = formElement.querySelector('input[name$="jobInput"]');
let profile__title = document.querySelector('.profile__title');
let profile__subtitle = document.querySelector('.profile__subtitle');

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    profile__title.textContent = nameInput.value;
    profile__subtitle.textContent = jobInput.value;
});


//активнаый Like----------------------------------------------------------------------

let likeElementByClass = document.querySelectorAll('.elements-change');

for (let i=0, length = likeElementByClass.length; i < length; i++){
    likeElementByClass[i].addEventListener('click', function() {
           this.setAttribute('src', './images/like-active.svg')
}
    );
}
