import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDv6kIRfAugc23xKkyQr28ZUWF_nZYX1Kk",
    authDomain: "career-appear.firebaseapp.com",
    projectId: "career-appear",
    storageBucket: "career-appear.appspot.com",
    messagingSenderId: "834401066961",
    appId: "1:834401066961:web:a3fa7e032acec57f974af0"
});

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;