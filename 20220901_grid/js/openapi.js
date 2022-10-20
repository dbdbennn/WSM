// 시도교육청코드 : B10 : 서울특별시교육청
// 표준학교코드 : 7010569 : 미림여자정보과학고등학교
// 식사코드 : 2 : 중식

// 신청주소 : https://open.neis.go.kr/hub/mealServiceDietInfo
// KEY : 
// ATPT_OFCDC_SC_CODE : 시도교육청코드
// SD_SCHUL_CODE : 표준학교코드
// MMEAL_SC_CODE : 식사코드
// MLSV_YMD : 급식일자
// MLSV_FROM_YMD : 급식시작일자
// MLSV_TO_YMD : 급식종료일자

// https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010569&MMEAL_SC_CODE=2&MLSV_YMD=20221011&Type=json&KEY=a9c902f701a34fe494d123a5b4970beb
// const KEY = "a9c902f701a34fe494d123a5b4970beb";
// const ATPT_OFCDC_SC_CODE = "B10";   // 서울특별시교육청
// const SD_SCHUL_CODE = "7010569";    // 미림여자정보과학고등학교
// let MMEAL_SC_CODE = 2;              // 중식
// let MLSV_YMD = "20221011";          // YYYYMMDD
// const Type = "json";
// let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?`+
// `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`+
// `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`+
// `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`+
// `&MLSV_YMD=${MLSV_YMD}`+
// `&Type=json`+
// `&KEY=${KEY}`;

// // console.log(url);

// 실시간으로 급식 메뉴 가져오자
// .date-grid-container>.grid-item에 마우스 올려놓으면, handler 함수 호출하자
let dateGridConatinerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridConatinerDiv.getElementsByClassName("grid-item"); // 모든 클래스를 가져옴
const handler = (e) => {
    console.log(year);
    console.log(month);
    let date = e.target.innerHTML; // 이벤트가 일어난 해당 텍스트를 가져옴
    console.log(date);
    // handler에서 year, month, date, 식사 로 url 만들어서 AJAX로 급식 정보 가져오자

    const KEY = "a9c902f701a34fe494d123a5b4970beb";
    const ATPT_OFCDC_SC_CODE = "B10";   // 서울특별시교육청
    const SD_SCHUL_CODE = "7010569";    // 미림여자정보과학고등학교
    // let MMEAL_SC_CODE = 2;              // 중식
    // zfill
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.padStart(2, "0")}`;          // YYYYMMDD
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
    urlToJSON(url);
}

const urlToJSON = (url) => {
    // XMLHttpRequest 객체 만들자
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //success
            console.log("성공"+xhr.response);
            showMenu(xhr.response);
        } else {
            // fail
            // console.log(xhr.status);            
        }
    }

    // 요청을 보낼 방식 정하자. true: 비동기
    xhr.open("GET", url, true);
    
    // 요청하자
    xhr.send();

    // json 받아서 HTML 조식, 중식, 석식에 보여주자
    const showMenu = (jsonString) => {
        console.log(jsonString);
        // jsonString -> json
        let json = JSON.parse(jsonString); // String을 json으로 번역 ex) "{'key': 'value'}" -> {'key': 'value'}
        
        try{
            if (json['mealServiceDietInfo'][0]['head'][1]['RESULT']['CODE']=='INFO-000') { //응답이 제대로 왔으면
                // json -> HTML
                breakfast.innerHTML = json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM'];
                lunch.innerHTML = json['mealServiceDietInfo'][1]['row'][1]['DDISH_NM']
                dinner.innerHTML = json['mealServiceDietInfo'][1]['row'][2]['DDISH_NM']
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
    }; 

}

for (let gridItem of gridItems) {
    gridItem.onmouseover = handler;
    // gridItem.addEventListener("mouseover", handler);
}
// 다 가져왔으면, 조식, 중식, 석식 표시하자
