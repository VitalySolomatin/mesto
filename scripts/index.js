//открытие/закрытие popap--------------------------------------------------------------
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__field_nameInput');
const jobInput = formElement.querySelector('.popup__field_jobInput');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

const closePopap = function() {
    popupElement.classList.remove('popup_opened');
};

//изменение полей profile--------------------------------------------------------------

const formSubmitHandler = function (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopap();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopap);
formElement.addEventListener('submit', formSubmitHandler);