import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyCL1giuajreNL7MaAlISBR_gr5AsmYW2p0",
  authDomain: "capstone-third-year.firebaseapp.com",
  projectId: "capstone-third-year",
  storageBucket: "capstone-third-year.appspot.com",
  messagingSenderId: "1037621155883",
  appId: "1:1037621155883:web:29c3209aefc5fe7cb2b26e",
  measurementId: "G-7GJBMSK190"
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
