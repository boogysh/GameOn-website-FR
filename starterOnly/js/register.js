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
  window.location.reload();
}

//----- REGISTER FORM-----------

// DOM Elements Form
const registerForm = document.querySelector("#registerForm");
const submitBtn = document.querySelector("#submitBtn");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const FN = document.querySelector("#first");
const errorFN = document.querySelector("#errorFirst");
const LN = document.querySelector("#last");
const errorLN = document.querySelector("#errorLast");
const EMAIL = document.querySelector("#email");
const errorEMAIL = document.querySelector("#errorEmail");
const DATE = document.querySelector("#birthdate");
const errorDate = document.querySelector("#errorBirthDate");
const QTY = document.querySelector("#quantity");
const errorQuantity = document.querySelector("#errorQuantity");
const TOURNMENTS = document.querySelectorAll("input[name ='location']");
const errorTournments = document.querySelector("#errorTournments");
const TERMS = document.querySelector("#checkbox1");
const errorTerms = document.querySelector("#errorTerms");
const informedEvents = document.querySelector("#checkbox2");

//errorMessages
const emptyErrorMsg = "";
const FN_ErrorMsg =
  "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const FN_advice_ErrorMsg = "Veuillez entrer que des majuscules et minuscules";
const LN_ErrorMsg =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const LN_advice_ErrorMsg = "Veuillez entrer que des majuscules et minuscules";
const emailErrorMsg =
  "Le format de l'email est incorrect. Ex: exemple@domaine.com";
const dateErrorMsg =
  "Vous devez entrer votre date de naissance. Ex: 01/01/2000";
const qtyErrorMessage = "Choisissez un numéro de 0 à 99";
const tournmentsErrorMsg = "Vous devez choisir une option.";
const termsErrorMsg =
  "Vous devez vérifier que vous acceptez les termes et conditions.";

//add error
const addError = (errorId, errorMsg, inputId) => {
  errorId.textContent = errorMsg;
  inputId && inputId.classList.add("border-error");
};
//del error
const delError = (errorId, errorMsg, inputId) => {
  errorId.textContent = errorMsg;
  inputId && inputId.classList.remove("border-error");
};

// Match first name
const matchFirstName = () => {
  const matched = FN.value.match(/^[a-z A-Z]{2,}$/);
  if (FN.value.length === 0 || matched) {
    data.firstName = FN.value;
    delError(errorFN, emptyErrorMsg, FN);
  } else if (FN.value.length === 1) {
    addError(errorFN, FN_ErrorMsg, FN);
    data.firstName = "";
  } else if (FN.value.length > 1 && !matched) {
    addError(errorFN, FN_advice_ErrorMsg, FN);
    data.firstName = "";
  }
};

// Match last name
const matchLastName = () => {
  const matched = LN.value.match(/^[a-z A-Z]{2,}$/);
  if (LN.value.length === 0 || matched) {
    data.lastName = LN.value;
    delError(errorLN, emptyErrorMsg, LN);
  } else if (LN.value.length === 1) {
    addError(errorLN, LN_ErrorMsg, LN);
    data.lastName = "";
  } else if (LN.value.length > 1 && !matched) {
    addError(errorLN, LN_advice_ErrorMsg, LN);
    data.lastName = "";
  }
};

// Match email
const matchEmail = () => {
  const matched = EMAIL.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (EMAIL.value.length === 0 || matched) {
    data.email = EMAIL.value;
    delError(errorEMAIL, emptyErrorMsg, EMAIL);
  } else {
    data.email = "";
    addError(errorEMAIL, emailErrorMsg, EMAIL);
  }
};

// Match birth date
const matchBirthDate = () => {
  const matched = DATE.value.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/);
  if (DATE.value.length === 0 || matched) {
    data.birthDate = DATE.value;
    delError(errorDate, emptyErrorMsg, DATE);
  } else {
    data.birthDate = "";
    addError(errorDate, dateErrorMsg, DATE);
  }
};

// Match quantity
const matchQtyTournments = () => {
  const val = QTY.value;
  const matched = val >= 0 && val < 100;
  if (matched) {
    data.quantity = parseInt(QTY.value);
    delError(errorQuantity, emptyErrorMsg, QTY);
  } else {
    addError(errorQuantity, qtyErrorMessage, QTY);
    data.quantity = null;
  }
};

//match CheckboxGroup
const checkedTournments = (e) => {
  const val = e.target.value;
  if (val) {
    data.tournments = val;
    delError(errorTournments, emptyErrorMsg);
  } else {
    data.tournments = "";
    addError(errorTournments, tournmentsErrorMsg);
  }
};

//Check General Conditions
const checkedTerms = () => {
  const val = TERMS.checked;
  if (val) {
    data.terms = val;
    delError(errorTerms, emptyErrorMsg);
  } else {
    data.terms = false;
    addError(errorTerms, termsErrorMsg);
  }
};
// informed
const checkedEvents = () => {
  const val = informedEvents.checked;
  val && (data.informed = val);
  !val && (data.informed = false);
};

//reset inputs after form submission
function resetAllInputs() {
  document.querySelectorAll("input").forEach((el) => {
    el.value = null;
  });
  TOURNMENTS.forEach((tournment) => {
    tournment.checked = false;
  });
}

// request post

const registerUser = async () => {
  // const urlServer = "http://localhost:4444"
  const urlServer = "https://game-on-boogysh.vercel.app";
  const response = await fetch(`${urlServer}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const registeredUser = await response.json();
  console.log("registeredUser", registeredUser);
};

//events
// modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // launch modal event
// FN.addEventListener("input", matchFirstName);
// LN.addEventListener("input", matchLastName);
// EMAIL.addEventListener("input", matchEmail);
// DATE.addEventListener("input", matchBirthDate);
// QTY.addEventListener("input", matchQtyTournments);
// TERMS.addEventListener("input", checkedTerms);
// informedEvents.addEventListener("input", checkedEvents);
//
TOURNMENTS.forEach((item) => item.addEventListener("input", checkedTournments));
submitBtn.addEventListener("click", (e) => sendForm(e));
//
const data = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  quantity: null,
  tournments: "",
  terms: true,
  informed: false,
};

async function sendForm(e) {
  e.preventDefault();
  if (
    data.firstName &&
    data.lastName &&
    data.email &&
    data.birthDate &&
    data.quantity &&
    data.tournments &&
    data.terms
  ) {
    await registerUser();
    modalBg.style.display = "none"; // a part of closeModal();
    launchModalConfirm();
  } else {
    !data.firstName && addError(errorFN, FN_ErrorMsg, FN);
    !data.lastName && addError(errorLN, LN_ErrorMsg, LN);
    !data.email && addError(errorEMAIL, emailErrorMsg, EMAIL);
    !data.birthDate && addError(errorDate, dateErrorMsg, DATE);
    !data.quantity && addError(errorQuantity, qtyErrorMessage, QTY);
    !data.tournments && addError(errorTournments, tournmentsErrorMsg);
  }
}
