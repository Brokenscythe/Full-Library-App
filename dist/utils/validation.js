"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(value) {
    return !value || value.trim() === "";
}
function userCredentialsAreValid(username, email, password) {
    return email.includes("@") && password.trim().length >= 6 && username.trim().length >= 4;
}
function userDetailsAreValid(username, name, email, password) {
    return userCredentialsAreValid(username, email, password) && !isEmpty(name);
}
function passwordIsConfirmed(password, confirmPassword) {
    return password === confirmPassword;
}
function emailIsConfirmed(email, checkEmail) {
    return email === checkEmail;
}
exports.default = { userDetailsAreValid, passwordIsConfirmed, emailIsConfirmed };
//# sourceMappingURL=validation.js.map