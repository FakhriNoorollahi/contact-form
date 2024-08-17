const submitBtn = document.querySelector(".submit-btn");
const inputText = [...document.querySelectorAll(".input-text")];
const inputEmail = document.querySelector(".input-email");
const radioInput = [...document.getElementsByName("query-type")];
const checkBoxInput = document.getElementById("rules");
const errorMsg = [...document.querySelectorAll(".error-message")];
const msgBox = document.querySelector(".message-box");

import { validateEmailInput } from "./validation.js";

const MsgBoxOpacity = [{ opacity: "0" }, { opacity: "1" }];

const msgBoxTiming = {
  duration: 1000,
  iterations: 1,
};

function submitHandler(e) {
  e.preventDefault();

  const textInputVal = checkTextInput();
  const emailVal = checkEmailInput();
  const radioInputVal = checkRadioInput();
  const checkBoxInputVal = checkCheckBoxInput();

  if (!textInputVal || !emailVal || !radioInputVal || !checkBoxInputVal) {
    return;
  }

  msgBox.style.display = "flex";
  msgBox.animate(MsgBoxOpacity, msgBoxTiming);

  setTimeout(() => {
    msgBox.style.display = "none";
    msgBox.animate(MsgBoxOpacity, msgBoxTiming);
  }, 3000);

  clearInputsValue();
}

function checkTextInput() {
  let isTrue = true;
  inputText.forEach((item) => {
    const inputValue = item.value;
    if (!inputValue) {
      item.nextElementSibling.style.opacity = "1";
      item.parentElement.style.borderColor = "hsl(0,66%,54%)";
      isTrue = false;
    } else {
      item.nextElementSibling.style.opacity = "0";
      item.parentElement.style.borderColor = "#6b7280";
    }
  });

  return isTrue;
}

function checkEmailInput() {
  const emailValue = inputEmail.value;
  const validateEmail = validateEmailInput(emailValue);
  if (!emailValue || !validateEmail) {
    inputEmail.nextElementSibling.style.opacity = "1";
    inputEmail.parentElement.style.borderColor = "hsl(0,66%,54%)";
    if (!emailValue) {
      inputEmail.nextElementSibling.textContent = "This filed is Required";
    } else if (!validateEmail) {
      inputEmail.nextElementSibling.textContent =
        "Please enter a valid email address";
    }
  } else {
    inputEmail.nextElementSibling.style.opacity = "0";
    inputEmail.parentElement.style.borderColor = "#6b7280";
    return true;
  }
}

function checkRadioInput() {
  const isChecked = radioInput
    .map((item) => (item.checked ? true : false))
    .includes(true);
  checkErrorMsg(isChecked, 0);
  return isChecked;
}

function checkCheckBoxInput() {
  const isChecked = checkBoxInput.checked;
  checkErrorMsg(isChecked, 1);
  return isChecked;
}

function checkErrorMsg(isChecked, index) {
  !isChecked
    ? (errorMsg[index].style.opacity = "1")
    : (errorMsg[index].style.opacity = "0");
}

function clearInputsValue() {
  inputText.forEach((item) => (item.value = ""));
  inputEmail.value = "";
  radioInput.forEach((item) => (item.checked = false));
  checkBoxInput.checked = false;
}

document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", submitHandler);

  inputText.forEach((item) => {
    item.addEventListener("paste", (e) => e.preventDefault());
  });

  inputEmail.addEventListener("paste", (e) => e.preventDefault());
});
