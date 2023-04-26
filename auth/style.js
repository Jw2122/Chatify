const showPassword = document.querySelectorAll('.showPassword');

function togglePasswordVisibility(element) {
    let currentImage = element.src;
    if (currentImage.split('auth/')[1] === "img/hide.png") {
        element.src = "auth/img/show-password.png";
        toogleInputType(element);
    } else {
        element.src = "auth/img/hide.png";
        toogleInputType(element);
    }
    console.log(currentImage);
}

function toogleInputType(element) {
    const authWindow = element.id.split('showPassword')[1];
    
    if (authWindow === 'Login') {
        const e = document.getElementById('login_password');
        if(e.type === 'password') {
            e.type = 'text';
        } else if(e.type === 'text') {
            e.type = 'password';
        }
    } 
    else if (authWindow === 'Signup') {
        const e = document.getElementById('signup_password');
        if(e.type === 'password') {
            e.type = 'text';
        } else if(e.type === 'text') {
            e.type = 'password';
        }
    }
}

showPassword.forEach((e) => {
    e.addEventListener('click', () => {
        let element = document.getElementById(e.id);
        togglePasswordVisibility(element);
    });
});

console.log('style.js loaded');
