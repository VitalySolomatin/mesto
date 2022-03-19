const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__field_inactive',
    errorClass: 'popup__field_active'
};

enableValidation(validationConfig);

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid;

    });
}

function toggleButtonState(submitButtonSelector, inputs, inactiveButtonClass) {
    const submitButtonElement = document.querySelectorAll(submitButtonSelector);
    submitButtonElement.forEach(buttonElement => {
        if (hasInvalidInput(inputs)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
        else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    })

};


function showError(inputErrorClass, input, errorClass) {
    const inputName = input.getAttribute('id');
    const errorPlace = document.querySelector(`.${inputName}-error`)

    errorPlace.textContent = input.validationMessage;
    errorPlace.classList.add(errorClass);
    input.classList.add(inputErrorClass);
};

function hideError(inputErrorClass, input, errorClass) {
    const inputName = input.getAttribute('id');
    const errorPlace = document.querySelector(`.${inputName}-error`)
    errorPlace.textContent = '';
    errorPlace.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
};


function checkInputValidity(inputErrorClass, input, errorClass) {
    if (!input.validity.valid) {
        showError(inputErrorClass, input, errorClass);
    } else {
        hideError(inputErrorClass, input, errorClass);
    }
};



function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    //запускаем наложение валидации
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        //прописываем обработчик для каждой формы, чтобы она не сабмитилась
        form.addEventListener('submit', e => e.preventDefault());

        //наложение обработчиков на поля форм
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        inputs.forEach(input => {


            input.addEventListener('input', e => {
                toggleButtonState(submitButtonSelector, inputs, inactiveButtonClass);


                checkInputValidity(inputErrorClass, input, errorClass);

            });
        })
    });
}
