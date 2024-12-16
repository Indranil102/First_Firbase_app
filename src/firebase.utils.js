// Import only the required modules from the modular SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDibo3YtyqazytLUguLYxUiMsD3fH7zmWQ",
    authDomain: "react-notes-app-7d3c9.firebaseapp.com",
    projectId: "react-notes-app-7d3c9",
    storageBucket: "react-notes-app-7d3c9.appspot.com",
    messagingSenderId: "1003875282000",
    appId: "1:1003875282000:web:83a2098518b69f7ecb3555"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(firebaseApp);

export { db };
