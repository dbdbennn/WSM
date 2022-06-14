// toggle hidden menu
const toggleMenu = function (toggleId, navListId) {
  const toggle = document.getElementById(toggleId);
  const navList = document.getElementById(navListId);

  const clickHandler = function () {
    navList.classList.toggle("show-menu");
  };

  if (toggle && navList) {
    toggle.addEventListener("click", clickHandler);
  }
};
toggleMenu("nav-toggle", "nav-list");

/* Functions */
// function say() {
//     console.log("Hello World");
// }

// const say = function(){
//     console.log("Hello World2");
// }

// const say = () => console.log("Hello World3");
// say();
