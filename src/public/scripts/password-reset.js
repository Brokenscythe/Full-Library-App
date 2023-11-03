document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is running!");

  const resetPasswordLinks = document.querySelectorAll(".show-modal");

  resetPasswordLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Link clicked!");

      const userId = this.getAttribute("data-user-id");
      const modal = document.querySelector(".modal[data-user-id='" + userId + "']");

      if (modal) {
        modal.classList.toggle("hidden");
      }
    });
  });

  const resetForms = document.querySelectorAll(".forma");

  resetForms.forEach(function (resetForm) {
    resetForm.addEventListener("submit", function (event) {
      const newPassword = resetForm.querySelector("#pwResetUcenik").value;
      const confirmPassword = resetForm.querySelector("#pw2ResetUcenik").value;
      const validatePwResetUcenik = document.getElementById("validatePwResetUcenik");

      if (newPassword !== confirmPassword) {
        event.preventDefault(); // Prevent form submission only if there are validation errors
        validatePwResetUcenik.textContent = "Sifre se ne poklapaju";
      } else {
        validatePwResetUcenik.textContent = "";
      }
    });
  });
});
