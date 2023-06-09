// --- MODALS ----

// DOM Elements modals
const modalBg = document.querySelector(".bground");
const modalBgConfirm = document.querySelector(".bground_confirm");

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}
// close modal form
function closeModal() {
  modalBg.style.display = "none";
  resetAllInputs();
  window.location.reload();
}

// launch modal confirmation
function launchModalConfirm() {
  modalBgConfirm.style.display = "flex";
}

// close modal confirmation
function closeModalConfirm() {
  modalBgConfirm.style.display = "none";
  localStorage.removeItem("register");
  resetAllInputs();
  // window.location.reload();
}
