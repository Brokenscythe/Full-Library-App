function isEmpty(value: string | undefined | null): boolean {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(username: string, email: string, password: string): boolean {
  return email.includes("@") && password.trim().length >= 6 && username.trim().length >= 4;
}

function userDetailsAreValid(username: string, name: string, email: string, password: string): boolean {
  return userCredentialsAreValid(username, email, password) && !isEmpty(name);
}

function passwordIsConfirmed(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

export default { userDetailsAreValid, passwordIsConfirmed };
