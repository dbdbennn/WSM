// 현재 년,월,일 알아내자
let today = new Date();
year = today.getFullYear();
month = today.getMonth() + 1; // 0 ~ 11
date = today.getDate(); // 1 ~ 31
day = today.getDay(); // 0: 일, 1: 월, 2: 화, 3: 수, 4: 목, 5: 금, 6: 토

// 현재 달의 마지막 날
let lastDate = new Date(year, month, 0).getDate(); // 마지막 날을 구할 때 0을 쓴다. date는 1부터 시작하기 때문이다.
let firstDay = new Date(year, month, 1).getDate();
// 현재 달 1일은 무슨 요일?
console.log(`${year}년 ${month}월 ${date}일 ${firstDay}, ${lastDate}`);