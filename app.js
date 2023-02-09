/* -------------------Вешаем слушатели на кнопки в попапах------------------- */
const buttonOpenPopup = document.querySelector(".button__popup");
const buttonOpenPopup2 = document.querySelector(".button__popup2");
const popup = document.querySelector(".popup");
const buttonClosePopup = popup.querySelector(".button_type_close");
const buttonMainScreen = document.querySelector(".main-screen__button");

function handleESC(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup() {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleESC);
  popup.addEventListener("click", handleOverlay);
}

function closePopup() {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleESC);
  popup.removeEventListener("click", handleOverlay);
}

// popup
buttonOpenPopup.addEventListener("click", function () {
  openPopup();
  buttonMainScreen.style.opacity = 0;
});

buttonOpenPopup2.addEventListener("click", function () {
  openPopup();
  buttonMainScreen.style.opacity = 0;
});

buttonClosePopup.addEventListener("click", function () {
  closePopup();
  buttonMainScreen.style.opacity = 1;
});

/* -------------------Отправка формы на почту------------------- */
const form = document.forms["form"];
const formArr = Array.from(form);
const button = form.getElementsByClassName("form__button");

form.addEventListener("submit", formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код ошибки: " + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("send_mail.php", {
    method: "POST",
    body: data,
  });
}

function formReset() {
  form.reset();
}
