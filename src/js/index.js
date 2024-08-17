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
    checkInputsStyle();
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
      checkErrorMsgInputs(item, inputValue);
      isTrue = false;
    } else {
      item.nextElementSibling.classList.remove("opacity-100");
    }
  });

  return isTrue;
}

function checkEmailInput() {
  const emailValue = inputEmail.value;
  const validateEmail = validateEmailInput(emailValue);
  if (!emailValue || !validateEmail) {
    checkEmailInputValue(emailValue, validateEmail);
  } else {
    inputEmail.nextElementSibling.classList.remove("opacity-100");
    return true;
  }
}

function checkEmailInputValue(emailValue, validateEmail) {
  checkErrorMsgInputs(inputEmail, validateEmail);
  if (!emailValue) {
    inputEmail.nextElementSibling.textContent = "This filed is Required";
  } else if (!validateEmail) {
    inputEmail.nextElementSibling.textContent =
      "Please enter a valid email address";
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
    ? errorMsg[index].classList.add("opacity-100")
    : errorMsg[index].classList.remove("opacity-100");
}

function checkErrorMsgInputs(item, value) {
  if (value) {
    item.nextElementSibling.classList.remove("opacity-100");
    item.classList.remove("border-[#d73c3c]");
  } else {
    item.nextElementSibling.classList.add("opacity-100");
    item.classList.add("border-[#d73c3c]");
  }
}

function clearInputsValue() {
  inputText.forEach((item) => (item.value = ""));
  inputEmail.value = "";
  radioInput.forEach((item) => (item.checked = false));
  checkBoxInput.checked = false;
}

function checkInputsStyle() {
  inputText.forEach((item) => {
    item.addEventListener("input", () => {
      checkErrorMsgInputs(item, item.value);
    });
  });

  inputEmail.addEventListener("input", (e) => {
    const emailVal = e.target.value;
    const validateEmail = validateEmailInput(emailVal);
    checkEmailInputValue(emailVal, validateEmail);
  });

  radioInput.forEach((item) => {
    item.addEventListener("change", () => {
      if (item.checked) checkErrorMsg(true, 0);
    });
  });

  checkBoxInput.addEventListener("change", () => {
    if (checkBoxInput.checked) checkErrorMsg(true, 1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", submitHandler);

  inputText.forEach((item) => {
    item.addEventListener("paste", (e) => e.preventDefault());
  });
  inputEmail.addEventListener("paste", (e) => e.preventDefault());
});
