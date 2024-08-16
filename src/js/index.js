const submitBtn = document.querySelector(".submit-btn");
const inputText = [...document.querySelectorAll(".input-text")];
const inputEmail = document.querySelector(".input-email");
const radioInput = [...document.getElementsByName("query-type")];
const errorMsg = [...document.querySelectorAll(".error-message")];
const checkBoxInput = document.getElementById("rules");
const msgBox = document.querySelector(".message-box");

import { validateEmailInput } from "./validation.js";

submitBtn.addEventListener("click", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  const textInputVal = checkTextInput();
  const emailVal = checkEmailInput();
  const radioInputVal = checkRadioInput();
  const checkBoxInputVal = checkCheckBoxInput();

  if (!textInputVal || !emailVal || !radioInputVal || !checkBoxInputVal) {
    return;
  }

  msgBox.style.opacity = "1";
  setTimeout(() => {
    msgBox.style.opacity = "0";
  }, 3000);
}

function checkTextInput() {
  let isTrue = true;
  inputText.forEach((item) => {
    const inputValue = item.value;
    if (!inputValue) {
      item.nextElementSibling.style.opacity = "1";
      isTrue = false;
    } else {
      item.nextElementSibling.style.opacity = "0";
    }
  });

  return isTrue;
}

function checkEmailInput() {
  const emailValue = inputEmail.value;
  const validateEmail = validateEmailInput(emailValue);
  if (!emailValue) {
    inputEmail.nextElementSibling.style.opacity = "1";
    inputEmail.nextElementSibling.textContent = "This filed is Required";
    return false;
  } else if (!validateEmail) {
    inputEmail.nextElementSibling.style.opacity = "1";
    inputEmail.nextElementSibling.textContent =
      "Please enter a valid email address";
    return false;
  } else {
    inputEmail.nextElementSibling.style.opacity = "0";
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
