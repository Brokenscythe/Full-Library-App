document.addEventListener("DOMContentLoaded", function () {
  var showModalLinks = document.querySelectorAll("#show-modal");  
  var passwordResetForm = document.getElementById("password-reset-form");
  let link;

  const errorElement = document.getElementById("validatePwResetBibliotekar");
  const errorElement2 = document.getElementById("validatePw2ResetBibliotekar");

  showModalLinks.forEach(function (showModalLink) {
    showModalLink.addEventListener("click", function (event) {
      event.preventDefault();
      link = showModalLink;
    });
  });
  
  passwordResetForm.addEventListener("submit", async function (event) {
    const newPassword = document.getElementById("pwResetBibliotekar").value
    const confirmPassword = document.getElementById("pw2ResetBibliotekar").value
    try {
      event.preventDefault();

      if (newPassword !== confirmPassword) {
        event.preventDefault(); 
        errorElement.textContent = "Šifre se ne poklapaju";
        errorElement2.textContent = 'Šifre se ne poklapaju';
        errorElement.style.color = "red";
        errorElement2.style.color = "red";
        return;
      }else if(!newPassword || !confirmPassword){
        errorElement.textContent = "Morate unijeti podatke.";
        errorElement2.textContent = 'Morate unijeti podatke.';
        errorElement.style.color = "red";
        errorElement2.style.color = "red";
      }

      var formData = new FormData(document.getElementById("password-reset-form"));
      const csrfToken = document.getElementById('_csrf').value;
      var librarianId = link.dataset.librarianid;

      console.log([...formData.entries()]);
      const response = await fetch(`/bibliotekarProfile/${librarianId}`, {
        method: "POST",
        body: formData,
        headers: {
          "CSRF-Token": csrfToken,
        },
      });

      console.log(response);
      if (response.ok) {
        errorElement.innerHTML = "Lozinka uspješno promjenjena";
        errorElement2.innerHTML = "Lozinka uspješno promjenjena";
        errorElement.style.color = "green";
        errorElement.style.fontSize = "13px";
        errorElement2.style.color = "green";
        errorElement2.style.fontSize = "13px";
        return;
      } else {
        const errorData = await response.json();
        console.log('Error', errorData);
      }
    } catch (error) {
      errorElement.innerHTML = "An error occurred while changing the password. Please try again later.";
      errorElement2.innerHTML = "An error occurred while changing the password. Please try again later.";
      errorElement.style.color = "red";
      errorElement.style.fontSize = "13px";
      errorElement2.style.color = "red";
      errorElement2.style.fontSize = "13px";
      console.log("JavaScript error:", error);
      return;
    }
  });
});
