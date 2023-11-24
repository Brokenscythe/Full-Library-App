function openPasswordChangeModal() {
  var modal = document.getElementById("password-reset-form");
  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var showModalLinks = document.querySelectorAll("#show-modal");
  let link;

  showModalLinks.forEach(function (showModalLinks) {
    showModalLinks.addEventListener("click", function (event) {
      event.preventDefault();
      openPasswordChangeModal();
      link = showModalLinks;
    });
  });

  var passwordResetForm = document.getElementById("password-reset-form");
  passwordResetForm.addEventListener("submit", async function (event) {
    try{
      event.preventDefault();
  
      var formData = new FormData(document.getElementById('password-reset-form'));
      const csrfToken = document.getElementById('_csrf').value;
      var librarianId = link.dataset.librarianid;
      
      console.log([...formData.entries()]);
      var password = formData.get('pwResetBibliotekar');
      var confirmPassword = formData.get('pw2ResetBibliotekar');
       const response = await fetch(`/bibliotekarProfile/${librarianId}`, {
        method: "POST",
        body: formData,
        headers: {
          "CSRF-Token": csrfToken,           
        },
      })
      console.log(response);
      if(response.ok){
        console.log('Password change successful');
        var modal = document.getElementById("password-reset-form");
        modal.style.display = "none";
        response.json();
      }else{
        const errorData = await response.json();
        console.log('Error', errorData);
      }

    }catch(error){
      const errorElement = document.getElementById("validatePwResetBibliotekar");
      const errorElement2 = document.getElementById("validatePw2ResetBibliotekar");
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
