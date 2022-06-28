// toggle hidden menu
const toggleMenu = function (toggleId, navListId) {
  const toggle = document.getElementById(toggleId);
  const navList = document.getElementById(navListId);
  const toggleIcon = toggle.getElementsByTagName("i")[0];

  if (toggle && navList) {
    // add: 추가, delete: 제거, toggle: 추가/제거
    toggle.addEventListener("click", () => {
      // toggle menu
      navList.classList.toggle("show-menu");
      //change toggle icon: bx-menu <-> bx-x-circle
      toggleIcon.classList.toggle("bx-menu");
      toggleIcon.classList.toggle("bx-x-circle");
    });
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

const addNow = (mainCardId) => {
  // html -> js
  const homeCard = document.getElementById(mainCardId);

  // 시간 -> 몇번째 식사가 선택되어야하는지 결정
  // 조식 끝: 8:00
  // 중식 끝: 13:00
  // 석식 끝: 17:50
  const now = new Date();
  let hours = now.getHours(); // 시
  let minutes = now.getMinutes(); // 분
  console.log(hours, minutes);

  minutes += hours * 60;

  // 조식
  if (minutes >= 17 * 60 + 50) {
    index = 0;
    // 석식
  } else if (minutes >= 13 * 60) {
    index = 2;
    // 중식
  } else if (minutes >= 8 * 60) {
    index = 1;
    // 조식
  } else {
    index = 0;
  }

  /*
  // 조식
  if (hours < 8) {
    index = 0;
  }

  // 중식
  else if (hours < 13) {
    index = 1;
  }

  // 석식
  else if (hours < 17) {
    index = 2;
  } else if (hours == 17) {
    if (minutes >= 50) {
      index = 0;
    } else {
      index = 2;
    }
  } else {
    index = 0;
  }
  */

  // homeCard에서 index번째 card에 now 클래스 추가
  let card = homeCard.getElementsByClassName("card")[index];
  card.classList.add("now");
};
addNow("home-card");
