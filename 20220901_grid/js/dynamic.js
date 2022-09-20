// 오늘 구하자
let today = new Date();
// 오늘 년 구하자
let year = today.getFullYear();
// 오늘 월 구하자
let month = today.getMonth();
month++;
// 오늘 년, 오늘 월, 1 날짜 객체 구하자
let firstDate = new Date(year, month - 1, 1);
// 그 객체 요일 구하자
let firstDay = firstDate.getDay();
console.log(`${year}년 ${month}월 ${firstDay}요일`);

// html 제어하자

// 오늘 년, 오늘 월 + 1, 0 날짜 객체 구하자