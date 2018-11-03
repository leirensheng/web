function checkDate(time) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let [inputYear, inputMonth, inputDate] = time.split("-");
    if (inputYear == year && inputMonth == month && inputDate == date) {
        return "今天";
    } else if (
        inputYear == year &&
      inputMonth == month &&
      inputDate == date - 1
    ) {
        return "昨天";
    } else if (
        inputYear == year &&
      inputMonth == month &&
      inputDate == date - 2
    ) {
        return "前天";
    } else {
        return "";
    }
    //  if()
    // if(date.)
}
function getWeekDay(date) {
    const num = date.getDay();
    switch (num) {
        case 0:
            return "星期日";
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六";
        default:
            return "";
    }
}
export {checkDate,getWeekDay};