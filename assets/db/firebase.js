// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase
const configuration = {
    apiKey: "AIzaSyBxQyoh1sR9LkJ4tIYrgBZQn3CJAUlFxms",
    authDomain: "flightmanagement-e3399.firebaseapp.com",
    projectId: "flightmanagement-e3399",
    storageBucket: "flightmanagement-e3399.appspot.com",
    messagingSenderId: "588158161945",
    appId: "1:588158161945:web:15f07bf7a506dcd8db8688",
    measurementId: "G-22YFN58H72"
};

// Khởi tạo Firebase
const app = initializeApp(configuration);

// Khởi tạo Firestore
const db = getFirestore(app);

export default db;