
function reverseStr(Str){

let listOfChars =Str.split('')
let reverseListOfChars = listOfChars.reverse()
let reverseStr = reverseListOfChars.join('')
return reverseStr;
// return Str.split().reverse.join()
}

function isPalindrome(Str){
let reverse = reverseStr(Str)
return Str === reverse;
}

function dateToStr(date){
let dateStr = {day: '', month:'',year:''}
if (date.day<10){
    dateStr.day ='0'+date.day;
}
else{
    dateStr.day=date.day.toString();
}
if (date.month<10){
    dateStr.month ='0'+date.month;
}
else{
    dateStr.month=date.month.toString();
}
if (date.year<10){
    dateStr.year='0'+date.year;
}
else{
    dateStr.year=date.year.toString();
}

return dateStr;
}

function getAllDateFormats(date){

    let dateStr = dateToStr(date)
    let ddmmyyyy =dateStr.day+dateStr.month+dateStr.year;
    let mmddyyyy= dateStr.month+dateStr.day+dateStr.year;
    let yyyymmdd=dateStr.year+dateStr.month+dateStr.day;

    let ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    let mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2);
    let yymmdd =dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd ]
}

function checkPalindromeForAllDateFormats(date)
{
let listOfPalindromes = getAllDateFormats(date)
let flag  =false;
for (let i=0; i<listOfPalindromes.length;i++ ){
    if (isPalindrome(listOfPalindromes[i])){
       flag =true;
        break; 
    }
}
return flag;
}

function isLeapYear(year){

    if(year % 400 == 0){
        return true;
    }
    if (year% 100 ==0){
        return false;
    }
    if (year % 4 == 0){
        return true;
    }
    return false;
}

function getNextDate(date){
let day = date.day+1
let month =date.month
let year = date.year
let dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

if(month === 2){ 
    // check for leap year
    if(isLeapYear(year)){ // 2020 => true
       if(day > 29){ // false
         day = 1;
         month++;  // increment the month
       }
    }
    else {
       if(day > 28){
         day = 1;
         month++;  // increment the month
       }
    }
  }
  // check for other months
  else {
    //  check if the day exceeds the max days in month
    if(day > dayInMonth[month - 1]){ 
      day = 1; 
      month++;  // increment the month
    }
  }

  // increment the year if month is greater than 12
  if(month > 12){
    month = 1;
    year++; 
  }

  return {
    day: day,  
    month: month,
    year: year
  };
}

  

// let date = {
//     day: day,
//     month:month,
//     year:year
// }

function getNextPalindromeDate(date){
    let ctr = 0;
    let nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }

  var dateInputRef = document.querySelector('#bday-input');
  var showBtnRef = document.querySelector('#show-btn');
  var resultRef = document.querySelector('#result');
  
  function clickHandler(e){
    var bdayStr = dateInputRef.value; // 2020-10-11
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome){
         resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
  
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
      }
    }
  }
  
  showBtnRef.addEventListener('click', clickHandler);
