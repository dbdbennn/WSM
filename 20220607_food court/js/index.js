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

// 오늘의 날짜 표시하자
const showToday = () => {
    // 오늘 구하고, 년, 월, 일, 요일 구하자
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay();
    const namesOfTheDaysOfTheWeek_array = ['일','월','화','수','목','금','토'];
    // console.log(year, month, date, namesOfTheDaysOfTheWeek_array[day]);
    
    // 문자열 형식 맞추고
    let title = `${year}.${month}.${date}(${namesOfTheDaysOfTheWeek_array[day]})`;
    // console.log(title);

    // HTML에 표시하자
    let cardDateDivs = document.querySelectorAll(".card-date");
    // let cardDateDivs = document.getElementsByClassName("card_date");

    // 3개 정도는 그냥 써라.
    for (cardDateDiv of cardDateDivs){
        cardDateDiv.innerHTML = title;
    }
};
showToday();


// 오늘의 급식 가져오고, 표시하자
const showTodayMenu = () => {
    //
};
showTodayMenu();