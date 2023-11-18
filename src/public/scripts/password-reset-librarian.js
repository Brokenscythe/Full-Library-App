function openPasswordChangeModal() {
  var modal = document.getElementById("password-reset-form");
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

    var formData = new FormData(passwordResetForm);

    formData.append("pwResetBibliotekar", document.getElementById("pwResetBibliotekar").value);
    formData.append("pw2ResetBibliotekar", document.getElementById("pw2ResetBibliotekar").value);

    const buttonElement = document.getElementsByName("resetPassword")[0];
    const csrfToken = buttonElement.getAttribute("data-csrf");

    const result = fetch(`/bibliotekarProfile/${librarianId}`, {
      method: "POST",
      body: formData,
      headers: {
        "CSRF-Token": csrfToken, 
      },
    })
      .then(function (response) {
        if (response.ok) {
          return result;
        } else {
          return response.json();
        }
      })
      .then(function (data) {
        if (data === "Password changed succesfully") {
          // Handle success
          // For example, show a success message to the user
        } else {
          // Handle failure
          // For example, show an error message to the user
        }
      })
      .then(function (data) {
        console.log("Password changed successfully", data);
        // You can display a success message here if required
      })
      .catch(function (error) {
        console.log("Error:", error);
        const errorElement = document.getElementById("validatePwResetBibliotekar");
        errorElement.innerHTML = "An error occurred while changing the password. Please try again later.";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "13px";
      });
  });
});
