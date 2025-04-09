// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";

// Your Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyAwokwmStkOo1zIld8ngsPJx-7X6ER2XQg",
    authDomain: "temp-detector-abdef.firebaseapp.com",
    databaseURL: "https://temp-detector-abdef-default-rtdb.firebaseio.com",
    projectId: "temp-detector-abdef",
    storageBucket: "temp-detector-abdef.firebasestorage.app",
    messagingSenderId: "1089903964313",
    appId: "1:1089903964313:web:e8013226167ebee1f7c808"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);

export default cong;
// Now you can use Firebase services in your React app!