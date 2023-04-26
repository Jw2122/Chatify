const cookieBanner = document.querySelector('#cookieBanner');
const allowCookiesBtn = document.querySelector('#allowCookies');
const blockCookiesBtn = document.querySelector('#blockCookies');
let allowCookies = false;
let blockCookies=false;

if (getCookie('allowCookies') === 'true') {
    console.log('allowCookies is true');
    allowCookies = true;
}



const date = {
    weekDay: new Date().toString().split(' ')[0],
    month: new Date().toString().split(' ')[1],
    day: new Date().toString().split(' ')[2],
    year: new Date().toString().split(' ')[3],
    time: {
        time: new Date().toString().split(' ')[5],
        hour: new Date().toString().split(' ')[5].split(':')[0],
        minute: new Date().toString().split(' ')[5].split(':')[1],
        second: new Date().toString().split(' ')[5].split(':')[2]
    },
    timeZone: new Date().toString().split(' ')[6].split('+')[0]
}

function getFollowingMonth(month) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < months.length; i++) {
        const e = months[i];
        if (e === month) {
            return months[i + 1];
        }
    }
}

if (allowCookies === false) {
    // show cookie banner
    showCookieBanner();


    // hide cookie banner after 5 seconds
    setTimeout(e => {
        hideCookieBanner();
        allowCookies = !blockCookies;
        document.cookie = "allowCookies=true; expires=" + date.weekDay + "," + date.day + " " + getFollowingMonth(date.month) + " " + date.year + " " + date.time.time + " " + date.timeZone + "; path=/";
    }, 5000);

    // function to hide the cookie banner
    function hideCookieBanner() {
        console.log('hide cookie banner');
        cookieBanner.style.transform = 'translate(37vh)';
        setTimeout(()=>{
            cookieBanner.style.display = 'none';
        }, 2000);
    }

    function showCookieBanner() {
        console.log('show cookie banner');
        cookieBanner.style.display = 'flex';
        cookieBanner.style.transform = 'translate(-37vh)';
    }

    // allow cookies
    allowCookiesBtn.addEventListener('click', e => {
        hideCookieBanner();
        allowCookies = true;
    });
    blockCookiesBtn.addEventListener('click', e => {
        hideCookieBanner();
        blockCookies = true;
    });

}






function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}








console.log('cookies.js loaded');