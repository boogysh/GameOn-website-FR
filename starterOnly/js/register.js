// --- MODALS ----

// DOM Elements modals
const modalBg = document.querySelector(".bground");
const modalBgConfirm = document.querySelector(".bground_confirm");
// launch modal form
function launchModal() {
  modalBg.style.display = "block";
  localStorage.setItem("terms", true);
  localStorage.setItem("informed", false);
}
// close modal form
function closeModal() {
  modalBg.style.display = "none";
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
const submitBtn = document.querySelector("#submitBtn");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const TOURNMENTS = document.querySelectorAll("input[name ='location']");
const errorTournments = document.querySelector("#errorTournments");

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
  inputId && inputId.classList.add("border-error");
  return (errorId.textContent = errorMsg);
};
//del error
const delError = (errorId, errorMsg, inputId) => {
  inputId && inputId.classList.remove("border-error");
  return (errorId.textContent = errorMsg);
};

// Match first name
const matchFirstName = () => {
  const FN = document.querySelector("#first");
  const errorFN = document.querySelector("#errorFirst");
  const matched = FN.value.match(/^[a-z A-Z]{2,}$/);
  if (matched) {
    delError(errorFN, emptyErrorMsg, FN);
    localStorage.setItem("firstName", FN.value);
  } else if (FN.value.length < 2) {
    addError(errorFN, FN_ErrorMsg, FN);
    localStorage.removeItem("fistName");
  } else if (FN.value.length >= 2 && !matched) {
    addError(errorFN, FN_advice_ErrorMsg, FN);
    localStorage.removeItem("fistName");
  }
};

// Match last name
const matchLastName = () => {
  const LN = document.querySelector("#last");
  const errorLN = document.querySelector("#errorLast");
  const matched = LN.value.match(/^[a-z A-Z]{2,}$/);
  if (matched) {
    delError(errorLN, emptyErrorMsg, LN);
    localStorage.setItem("lastName", LN.value);
  } else if (LN.value.length < 2) {
    addError(errorLN, LN_ErrorMsg, LN);
    localStorage.removeItem("lastName");
  } else if (LN.value.length >= 2 && !matched) {
    addError(errorLN, LN_advice_ErrorMsg, LN);
    localStorage.removeItem("lastName");
  }
};

// Match email
const matchEmail = () => {
  const EMAIL = document.querySelector("#email");
  const errorEMAIL = document.querySelector("#errorEmail");
  const matched = EMAIL.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (matched) {
    delError(errorEMAIL, emptyErrorMsg, EMAIL);
    localStorage.setItem("email", EMAIL.value);
  } else {
    addError(errorEMAIL, emailErrorMsg, EMAIL);
    localStorage.removeItem("email");
  }
};

// Match birth date
const matchBirthDate = () => {
  const DATE = document.querySelector("#birthdate");
  const errorDate = document.querySelector("#errorBirthDate");
  const matched = DATE.value.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/);
  if (matched) {
    delError(errorDate, emptyErrorMsg, DATE);
    localStorage.setItem("birthDate", DATE.value);
  } else {
    addError(errorDate, dateErrorMsg, DATE);
    localStorage.removeItem("birthDate");
  }
};

// Match quantity
const matchQtyTournments = () => {
  const QTY = document.querySelector("#quantity");
  const errorQuantity = document.querySelector("#errorQuantity");
  const val = QTY.value;
  const matched = val >= 0 && val < 100 && val !== null && val.length !== 0;
  if (matched) {
    delError(errorQuantity, emptyErrorMsg, QTY);
    localStorage.setItem("quantity", QTY.value);
  } else {
    addError(errorQuantity, qtyErrorMessage, QTY);
    localStorage.removeItem("quantity");
  }
};

//match CheckboxGroup
const checkedTournments = (e) => {
  const val = e.target.value;
  if (val) {
    delError(errorTournments, emptyErrorMsg);
    localStorage.setItem("tournments", val);
  } else {
    addError(errorTournments, tournmentsErrorMsg);
    localStorage.removeItem("tournments");
  }
};

//Check General Conditions
const checkedTerms = () => {
  const TERMS = document.querySelector("#checkbox1");
  const errorTerms = document.querySelector("#errorTerms");
  const val = TERMS.checked;
  if (val) {
    delError(errorTerms, emptyErrorMsg);
    localStorage.setItem("terms", true);
  } else {
    addError(errorTerms, termsErrorMsg);
    localStorage.setItem("terms", false);
  }
};
// informed
const checkedEvents = () => {
  const informedEvents = document.querySelector("#checkbox2");
  const val = informedEvents.checked;
  val && localStorage.setItem("informed", true);
  !val && localStorage.setItem("informed", false);
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
  const data = JSON.parse(localStorage.getItem("data"));
  try {
    const response = await fetch(`${urlServer}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const registeredUser = await response.json();
    console.log("registeredUser", registeredUser);
  } catch (err) {
    console.log(err);
  }
};

//events
TOURNMENTS.forEach((item) => item.addEventListener("input", checkedTournments));
submitBtn.addEventListener("click", (e) => sendForm(e));

async function sendForm(e) {
  e.preventDefault();
  const data = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    birthDate: localStorage.getItem("birthDate"),
    quantity: localStorage.getItem("quantity"),
    tournments: localStorage.getItem("tournments"),
    terms: localStorage.getItem("terms"),
    informed: localStorage.getItem("informed"),
  };
  // save data to local storage
  localStorage.setItem("data", JSON.stringify(data));
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
    localStorage.clear();
    resetAllInputs();
    closeModal();
    launchModalConfirm();
  } else {
    !data.firstName && matchFirstName();
    !data.lastName && matchLastName();
    !data.email && matchEmail();
    !data.birthDate && matchBirthDate();
    !data.quantity && matchQtyTournments();
    !data.tournments && checkedTournments(e);
  }
}
