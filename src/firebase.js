
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  databaseURL: "https://hps-new-bc219-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyBSJk09xKNtGwssaebf3Uw4_PG8_F-dWI4",
  authDomain: "hps-new-bc219.firebaseapp.com",
  projectId: "hps-new-bc219",
  storageBucket: "hps-new-bc219.appspot.com",
  messagingSenderId: "311656800637",
  appId: "1:311656800637:web:b651c4d82f0a4d3e5d2c14",
  measurementId: "G-B35G1KM3YH"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database, app };
export const auth=getAuth(app);
