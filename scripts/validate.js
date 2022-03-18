const obj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__field_inactive',
    errorClass: 'popup__field_active'
};

enableValidation(obj);

function toggleButtonState(submitButtonSelector, inputs, inactiveButtonClass) {
    const submitButtonElement = document.querySelectorAll(submitButtonSelector);
    const hasInvalidInput = inputs.some((input) => {
        return !input.validity.valid;

    });
    submitButtonElement.forEach(buttonElement => {
        if (hasInvalidInput) {
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
                //проверяем валидность введенных данных
                toggleButtonState(submitButtonSelector, inputs, inactiveButtonClass);


                if (input.validity.valid) {
                    //скрываем ошибку под полем
                    hideError(inputErrorClass, input, errorClass);

                } else {
                    //показываем ошибку под полем
                    showError(inputErrorClass, input, errorClass);

                }

            });
        })
    });
}
