export function validateEmailInput(emailInput) {
  const emailRegex = /^[a-zA-Z0-9._]{3,25}@\w{2,6}\.[a-z]{2,3}$/g;
  if (emailRegex.test(emailInput)) {
    return true;
  } else {
    return false;
  }
}
