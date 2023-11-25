function openPasswordChangeModal() {
  var modal = document.getElementById("passwordChangeModal");
  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var showModalLinks = document.querySelectorAll(".show-modal");

  showModalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openPasswordChangeModal();
    });
  });

  var passwordResetForm = document.getElementById("password-reset-form");
  var librarianId = passwordResetForm.dataset.librarianId;

  passwordResetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var password1 = document.getElementById("pwResetBibliotekar").value;
    var password2 = document.getElementById("pw2ResetBibliotekar").value;

    var validatePassword1 = document.getElementById("validatePwResetBibliotekar");
    var validatePassword2 = document.getElementById("validatePw2ResetBibliotekar");
    const buttonElement = document.getElementsByName("resetPassword")[0];
    const csrfToken = buttonElement.getAttribute("data-csrf");

    if (password1 !== password2) {
      validatePassword1.innerHTML = "Morate unijeti iste sifre!";
      validatePassword2.innerHTML = "Morate unijeti iste sifre!";
      validatePassword1.style.color = "red";
      validatePassword2.style.color = "red";
      validatePassword1.style.fontSize = "13px";
      validatePassword2.style.fontSize = "13px";
      return;
    } else if (password1.trim() === "" || password2.trim() === "") {
      validatePassword1.innerHTML = "Morate unijeti sifru!";
      validatePassword2.innerHTML = "Morate unijeti sifru!";
      validatePassword1.style.color = "red";
      validatePassword2.style.color = "red";
      validatePassword1.style.fontSize = "13px";
      validatePassword2.style.fontSize = "13px";
      return;
    }
    validatePassword1.innerHTML = "";
    validatePassword2.innerHTML = "";

    var formData = new FormData(passwordResetForm);

    fetch(`/bibliotekarProfile/${librarianId}` + "?_csrf=" + csrfToken, {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          response.json("Password changed succesfully");
        } else {
          response.json("Password changed unsuccesfully");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        // Handle the error here
      });
  });
});
