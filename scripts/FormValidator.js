export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));

    };

    _showError(input) {
        const { inputErrorClass, errorClass } = this._settings;
        const errorPlace = this._form.querySelector(`#${input.id}-error`);

        errorPlace.textContent = input.validationMessage;
        errorPlace.classList.add(errorClass);
        input.classList.add(inputErrorClass);
    };

    _hideError(input) {
        const { inputErrorClass, errorClass } = this._settings;
        const errorPlace = this._form.querySelector(`#${input.id}-error`);

        errorPlace.textContent = '';
        errorPlace.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    };


    _checkInputValidity(inputErrorClass, input, errorClass) {
        if (!input.validity.valid) {
            this._showError(input, inputErrorClass, errorClass);
        } else {
            this._hideError(input, inputErrorClass, errorClass);
        }

    };

    _hasInvalidInput() {
        return this._inputs.some((input) => {
            return !input.validity.valid;

        });
    };

    _toggleButtonState(submitButtonSelector, inputs) {
        const submitButtonElement = this._form.querySelectorAll(submitButtonSelector);
        const { inactiveButtonClass } = this._settings;

        submitButtonElement.forEach(buttonElement => {
            if (this._hasInvalidInput(inputs)) {
                buttonElement.classList.add(inactiveButtonClass);
                buttonElement.setAttribute('disabled', true);
            }
            else {
                buttonElement.classList.remove(inactiveButtonClass);
                buttonElement.removeAttribute('disabled');
            }
        })

    };

    _setEventListeners() {

        this._inputs.forEach(input => {
            input.addEventListener('input', e => {
                this._toggleButtonState(this._settings.submitButtonSelector, this._settings.inactiveButtonClass);
                this._checkInputValidity(this._settings.inputErrorClass, input, this._settings.errorClass);
            });

        });
    }


    enableValidation() {

        this._form.addEventListener('submit', e => e.preventDefault());
        this._setEventListeners();
    };

    resetValidation() {
        this._form.reset();
        this._toggleButtonState(this._settings.submitButtonSelector, this._settings.inactiveButtonClass);
        this._inputs.forEach(input => {
            this._hideError(input)
        })
    };


}