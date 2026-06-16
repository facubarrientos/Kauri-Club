import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2HtO4GYnfidmY292qjV1dwvjcRksuMH8",
    authDomain: "kauri-club.firebaseapp.com",
    projectId: "kauri-club",
    storageBucket: "kauri-club.firebasestorage.app",
    messagingSenderId: "141061985422",
    appId: "1:141061985422:web:264a4ab2a9b607433725df"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);