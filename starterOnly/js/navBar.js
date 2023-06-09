const itemsNav = document.querySelectorAll(".itemNav");
//
const details = document.querySelector("#details");
const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const events = document.querySelector("#events");
//
const mainNavBar = document.querySelector(".main-navbar");
const burgerMenu = document.querySelector(".icon");

//show navbar in responsive
burgerMenu.addEventListener("click", () => {
  mainNavBar.classList.toggle("show");
});

const delActive = (id) => {
  id.forEach((items) => {
    items.classList.remove("active");
  });
};
details.addEventListener("click", () => {
  delActive(itemsNav);
  details.classList.add("active");
});

about.addEventListener("click", () => {
  delActive(itemsNav);
  about.classList.add("active");
});

contact.addEventListener("click", () => {
  delActive(itemsNav);
  contact.classList.add("active");
});

events.addEventListener("click", () => {
  delActive(itemsNav);
  events.classList.add("active");
});
