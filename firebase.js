import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { doc, setDoc } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyDGGczmKLHxNm2so7gOX7PYELd-a3LeBok",
  authDomain: "fittrack-db.firebaseapp.com",
  projectId: "fittrack-db",
  storageBucket: "fittrack-db.appspot.com",
  messagingSenderId: "922138999754",
  appId: "1:922138999754:web:0b7abcd0ec4fd068352d33",
  measurementId: "G-Y6FWP42DXW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

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


export { app , auth, db, storage, signInwithGoogle};
