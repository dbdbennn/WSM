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
    // 지금 구하자
    let now = new Date();

    // 년, 월, 일 구하자
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate(); 

    // 급식 API 요청할 url 만들자
    const KEY = "a9c902f701a34fe494d123a5b4970beb";
    const ATPT_OFCDC_SC_CODE = "B10";   // 서울특별시교육청
    const SD_SCHUL_CODE = "7010569";    // 미림여자정보과학고등학교
    // let MMEAL_SC_CODE = 2;              // 중식
    // zfill
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.toString().padStart(2, "0")}`;          // YYYYMMDD
    console.log(MLSV_YMD);
    const Type = "json";
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`+
        `?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`+
        `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`+
        // `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`+ 조중석 합쳐서 나옴
        `&MLSV_YMD=${MLSV_YMD}`+
        `&Type=${Type}`+
        `&KEY=${KEY}`;

    console.log(url);
    // 요청하자
    fetch(url)
    .then(response => response.json()) // 응답 온 데이터 -> json
    .then(json => showMenu(json)); // json -> HTML에 표시하자

};

const showMenu = (json) => {
  // HTML -> js 메뉴 표시하는 부분
  let menus = document.querySelectorAll(".card-menu");
  let breakfast = menus[0];
  let lunch = menus[1];
  let dinner = menus[2];

  // json 안에 조식, 중식, 석식 정보 빼오고
  try{
    if (json['mealServiceDietInfo'][0]['head'][1]['RESULT']['CODE']=='INFO-000') { //응답이 제대로 왔으면
        // json -> HTML
        try{
            let breakfastData = json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM']; 
            breakfast.innerHTML = breakfastData.replace(/\([0-9\.]*\)/g, ""); // 정규표현식 : (문자 숫자나 .문자)문자
            // (            \(
            // 숫자 한글자 [0123456789]
            //  .           \.
            // 0 ~ n개
            // )            \)
            // 글로벌        g
        }catch{
            breakfast.innerHTML = "없음"
        }

        try{
            let lunchData = json['mealServiceDietInfo'][1]['row'][1]['DDISH_NM'];
            lunch.innerHTML = lunchData.replace(/\([0-9\.]*\)/g, ""); 
        }catch{
            lunch.innerHTML = "없음"
        }

        try{
            let dinnerData = json['mealServiceDietInfo'][1]['row'][2]['DDISH_NM'];
            dinner.innerHTML = dinnerData.replace(/\([0-9\.]*\)/g, "");
        }catch{
            dinner.innerHTML = "없음"
        }
        
    } else { // 응답이 이상하면
        // 없음 표시하자
        breakfast.innerHTML = "없음";
        lunch.innerHTML = "없음";
        dinner.innerHTML = "없음";
    }
  } catch { // 문제가 생기면 {'mealServiceDietInfo'} 아니고 {'RESULT'}로 옴
      breakfast.innerHTML = "없음";
      lunch.innerHTML = "없음";
      dinner.innerHTML = "없음";
  }
}
showTodayMenu();