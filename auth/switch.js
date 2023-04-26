const signupBtn = document.querySelector('#signUp');
const loginBtn = document.querySelector('#logIn');


const form = document.querySelector('form');
const authWindow = document.querySelector('#authWindow');


signupBtn.addEventListener('click', (e) => {
    authWindow.style.transform = 'translate(calc(0%))';

});
loginBtn.addEventListener('click', (e) => {
    authWindow.style.transform = 'translate(calc(-50%))';
});


// wischer erkennen
// Die Variable "swipeThreshold" gibt an, wie viel Pixel der Finger bewegen muss, um als Wischer erkannt zu werden.
const swipeThreshold = 50;

let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;

// Berührungsstart
authWindow.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

// Berührungsende
authWindow.addEventListener("touchend", function (event) {
    distX = event.changedTouches[0].clientX - startX;
    distY = event.changedTouches[0].clientY - startY;

    // Überprüfung, ob die Distanz groß genug ist, um als Wischer zu gelten
    if (Math.abs(distX) > swipeThreshold || Math.abs(distY) > swipeThreshold) {
        // Überprüfung, ob der Wischer horizontal oder vertikal ist
        if (Math.abs(distX) > Math.abs(distY)) {
            // Der Wischer ist horizontal
            if (distX > 0) {
                // console.log("Swipe right!");
                authWindow.style.transform = 'translate(calc(0%))';
            } else {
                // console.log("Swipe left!");
                authWindow.style.transform = 'translate(calc(-50%))';
            }
        } else {
            // Der Wischer ist vertikal
            if (distY > 0) {
                // console.log("Swipe down!");
            } else {
                // console.log("Swipe up!");
            }
        }
    }
});


setTimeout(e=>{
    signupBtn.click();
}, 1000);



console.log('switch.js loaded');