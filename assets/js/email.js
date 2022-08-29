window.onload = function () {
  function showSuccessModal() {
    document.getElementById("myModal").style.display = "flex";
    document.getElementById("modal-background").className =
      "modal-content-success";
    document.getElementById("result-message").innerText =
      "Your message has been sent successfully!";
  }
  function showErrorModal(mssg) {
    document.getElementById("myModal").style.display = "flex";
    document.getElementById("modal-background").className =
      "modal-content-error";
    document.getElementById("result-message").innerText = mssg
      ? mssg
      : "Failed to send your message, please try again";
  }
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const template_params = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
      };
      if (
        !template_params.email.trim() ||
        !template_params.name.trim() ||
        !template_params.message.trim()
      ) {
        showErrorModal("All the fields are required");
        return;
      }
      // YOUR EMAIL.JS API KEY IN FORMAT user_xxxxxxxxxxxxxxxxxx
      let API_KEY = "GgjT-7LhtIHk5Zx9U";
      // YOUR EMAIL.JS SERVICE ID
      let SERVICE_ID = "service_au8uwe9";
      // YOUR EMAIL.JS TEMPLATE ID
      let TEMPLATE_ID = "template_5phmq55";

      emailjs.send(SERVICE_ID, TEMPLATE_ID, template_params, API_KEY).then(
        function () {
          showSuccessModal();
          event.target.reset();
        },
        function (error) {
          showErrorModal();
        }
      );
    });
};
