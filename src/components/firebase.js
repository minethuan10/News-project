import { initializeApp }from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDvFVmAo0Uh87w5m6X3LWdd8Q5U-3KWda8",
  authDomain: "authentication-233c0.firebaseapp.com",
  projectId: "authentication-233c0",
  storageBucket: "authentication-233c0.appspot.com",
  messagingSenderId: "1006039767993",
  appId: "1:1006039767993:web:85970e2610a1d118917468"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
