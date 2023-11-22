import { initializeApp as initializeClientApp } from "firebase/app";

export default function initFire() {
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAUC_m3TaO4CZSHj0jo9-AHkCU77lqqszg",
    authDomain: "x-messenger-8f301.firebaseapp.com",
    projectId: "x-messenger-8f301",
    storageBucket: "x-messenger-8f301.appspot.com",
    messagingSenderId: "159442236476",
    appId: "1:159442236476:web:51b755de34f8c19477bf39",
    measurementId: "G-RQB2TQESFD",
  };

  const app = initializeClientApp(firebaseConfig);
  return app;
}
