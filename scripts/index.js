const initialCards = [
  { name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" },
  { name: "Челябинская область", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg" },
  { name: "Иваново", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" },
  { name: "Камчатка", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" },
  { name: "Холмогорский район", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg" },
  { name: "Байкал", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg" }
];

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openModal(popup) {
popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
popup.classList.remove('popup_is-opened');
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const saveButton = profilePopup.querySelector('.popup__button');

const cardFormElement = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

const cardContainer = document.querySelector('.places__list');

function handleProfileFormSubmit(evt) {
evt.preventDefault();
const newName = nameInput.value;
const newJob = jobInput.value;
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__description');
profileNameElement.textContent = newName;
profileJobElement.textContent = newJob;
closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
evt.preventDefault();
const cardName = cardNameInput.value;
const cardLink = cardLinkInput.value;
const newCard = createCard({ name: cardName, link: cardLink });
cardContainer.prepend(newCard);
cardFormElement.reset();
closeModal(cardPopup);
}

function createCard(data) {
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const cardImage = cardElement.querySelector('.card__image');
const cardTitle = cardElement.querySelector('.card__title');
const cardLikeButton = cardElement.querySelector('.card__like-button');
const cardDeleteButton = cardElement.querySelector('.card__delete-button');
cardImage.src = data.link;
cardImage.alt = data.name;
cardTitle.textContent = data.name;
cardLikeButton.addEventListener('click', () => {
  cardLikeButton.classList.toggle('card__like-button_is-active');
});
cardDeleteButton.addEventListener('click', () => {
  cardElement.remove();
});
cardImage.addEventListener('click', () => {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(imagePopup);
});
return cardElement;
}

// Функция для отображения ошибки ввода
function showInputError(inputElement, errorMessage) {
const errorElement = profileFormElement.querySelector(`.${inputElement.name}-error`);
inputElement.classList.add('popup__input_invalid');
errorElement.textContent = errorMessage;
errorElement.style.display = 'block';
}

// Функция для скрытия ошибки ввода
function hideInputError(inputElement) {
const errorElement = profileFormElement.querySelector(`.${inputElement.name}-error`);
inputElement.classList.remove('popup__input_invalid');
errorElement.textContent = '';
errorElement.style.display = 'none';
}

// Функция для проверки валидности ввода
function checkInputValidity(inputElement) {
if (!inputElement.validity.valid) {
  if (inputElement.validity.valueMissing) {
    showInputError(inputElement, 'Вы пропустили это поле.');
  } else if (inputElement.validity.tooShort) {
    showInputError(inputElement, `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ.`);
  } else {
    showInputError(inputElement, inputElement.validationMessage);
  }
} else {
  hideInputError(inputElement);
}
}

// Функция для переключения состояния кнопки
function toggleButtonState() {
if (profileFormElement.checkValidity()) {
  saveButton.disabled = false;
} else {
  saveButton.disabled = true;
}
}

// Обработчик ввода в форму
profileFormElement.addEventListener('input', (event) => {
checkInputValidity(event.target);
toggleButtonState();
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

editButton.addEventListener('click', () => {
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
openModal(profilePopup);
});

addButton.addEventListener('click', () => {
cardFormElement.reset();
openModal(cardPopup);
});

closeProfilePopupButton.addEventListener('click', () => {
closeModal(profilePopup);
});

closeCardPopupButton.addEventListener('click', () => {
closeModal(cardPopup);
});

closeImagePopupButton.addEventListener('click', () => {
closeModal(imagePopup);
});

document.querySelectorAll('.popup').forEach(popup => {
popup.classList.add('popup_is-animated');
});

function renderCards() {
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardContainer.appendChild(cardElement);
});
}

renderCards();
