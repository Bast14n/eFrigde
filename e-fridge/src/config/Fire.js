import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB0oNIdCxxr6QyniIO9e1luNzR6giC4nDY",
    authDomain: "efridge-5256e.firebaseapp.com",
    databaseURL: "https://efridge-5256e.firebaseio.com",
    projectId: "efridge-5256e",
    storageBucket: "efridge-5256e.appspot.com",
    messagingSenderId: "630139984649",
    appId: "1:630139984649:web:d8a2d5685d0270ec"
};

const fire = firebase.initializeApp(config);
export default fire;