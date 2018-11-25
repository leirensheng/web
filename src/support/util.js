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

function copyContent(fp,ua= window.navigator.userAgent) {
    var input = document.createElement("input");
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value",  fp);
    input.setAttribute("width", 0);
    input.setAttribute("height", 0);
    document.body.appendChild(input);
    if (ua.toLowerCase().indexOf("android") !==-1) {
        input.select();
    }
    input.setSelectionRange(0, input.value.length);
    document.execCommand("copy");
    document.body.removeChild(input);
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



function getDocumentTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }

    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
    var windowHeight = 0;    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
//滚动条滚动高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;    return scrollHeight;
}
export {
    checkDate,
    getWeekDay,
    getWindowHeight,
    getScrollHeight,
    copyContent,
    getDocumentTop
};