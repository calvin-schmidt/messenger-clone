import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBW3H1cWMW-DGPJ1z_lTzfBC4Srm-fzWUc",
  authDomain: "messenger-clone-173a3.firebaseapp.com",
  projectId: "messenger-clone-173a3",
  storageBucket: "messenger-clone-173a3.appspot.com",
  messagingSenderId: "1009173432829",
  appId: "1:1009173432829:web:5310242ba2289d2005f194",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export { auth, provider };
export default db;
