import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyBcH9t-6624PdXh1n8q8qy81ehMXZ1NL2w",
  authDomain: "fittrack-f1516.firebaseapp.com",
  databaseURL: "https://fittrack-f1516-default-rtdb.firebaseio.com",
  projectId: "fittrack-f1516",
  storageBucket: "fittrack-f1516.appspot.com",
  messagingSenderId: "447775930741",
  appId: "1:447775930741:web:bf252916d12926af997b3c",
  measurementId: "G-LFFJBG3WWD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


const signInwithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    const displayName = user.displayName || "";
    const [firstName, ...lastNameParts] = displayName.split(" ");
    const lastName = lastNameParts.join(" "); 

    await setDoc(doc(db, "users", user.uid), {
      firstName:  firstName,
      lastName: lastName,
      email: user.email,
    })
 } catch (error) {
  console.log(error);
 }
}


export { app , auth, db, signInwithGoogle};
