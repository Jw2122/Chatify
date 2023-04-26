// import { } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase- SERVICE .js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCsiDbCO4jlV97N1blzfo2R2w6LgHowLuY",
    authDomain: "chatify-1b096.firebaseapp.com",
    databaseURL: "https://chatify-1b096-default-rtdb.firebaseio.com",
    projectId: "chatify-1b096",
    storageBucket: "chatify-1b096.appspot.com",
    messagingSenderId: "696103072500",
    appId: "1:696103072500:web:356c8f0bc0b46269ad24a1",
    measurementId: "G-QXTQLH5H5S"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('https://chatify-1b096.firebaseapp.com/__/auth/handler');

const loginGoogle = document.getElementById("login_google");
const signupGoogle = document.getElementById("signup_google");
const loginMicrosoft = document.getElementById("login_microsoft");
const signupMicrosoft = document.getElementById("signup_microsoft");
const signupSubmit = document.getElementById("signup_submit");
const loginSubmit = document.getElementById("login_submit");

loginGoogle.addEventListener("click", e => { signInWithGoogle(false); });
signupGoogle.addEventListener("click", e => { console.log('sign up with google'); signInWithGoogle(true); });
loginMicrosoft.addEventListener("click", e => {signInWithMicrosoft(false)});
signupMicrosoft.addEventListener("click", e => {signInWithMicrosoft(true)});
loginSubmit.addEventListener("click", logIn);
signupSubmit.addEventListener("click", createUser);


function createUser(event) {

    event.preventDefault();

    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Signed in');
            console.log(user.uid);
            goToChat(true, user, email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);
        });
}

function logIn(event) {

    event.preventDefault();

    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Signed in');
            console.log(user.uid);
            goToChat(false, user, email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);
        });
}

// login with google

function signInWithGoogle(signup) {
    console.log('signInWithGoogle');

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            alert('Signed in');
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            goToChat(signup, user, user.email);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });
}

// login with microsoft

function signInWithMicrosoft(signup) {
    signInWithPopup(auth, microsoftProvider)
        .then((result) => {
            // User is signed in.
            alert('Signed in');
            // IdP data available in result.additionalUserInfo.profile.

            // Get the OAuth access token and ID Token
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const idToken = credential.idToken;
        })
        .catch((error) => {
            // Handle error.
            alert('microsoft: '+error.message);
        });
}


// database


function writeUserData(user, email, imageUrl, name) {
    email = email.replace(/\./g, "%p%");
    console.log(email);
    const db = getDatabase();
    set(ref(db, 'users/' + email), {
        username: name,
        email: email,
        profile_picture: imageUrl,
        lastOnline: new Date().getTime()
    });
}
function updateUserData(user, email, imageUrl) {
    email = email.replace(/\./g, "?p?");
    const db = getDatabase();
    update(ref(db, 'users/' + email), {
        email: email,
        profile_picture: imageUrl,
        lastOnline: new Date().getTime()
    });
}
function goToChat(signup, user, email) {
    console.log('goToChat0');
    if (signup === true) {
        writeUserData(user, email, 'https://');
    } else if (signup === false) {
        updateUserData(user, email, 'https://');
    }
    console.log('goToChat1');
    const url = `chat.html?uid=${encodeURIComponent(user.uid)}`;
    history.pushState({ uid: user.uid }, null, url);
    window.location.href = url;
}


console.log('auth.js loaded');
