import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtWaxmrQ3tblF_3ImUNESCpZ0OBVuqiLM",
  authDomain: "proyect-25cbe.firebaseapp.com",
  projectId: "proyect-25cbe",
  storageBucket: "proyect-25cbe.appspot.com",
  messagingSenderId: "502703780711",
  appId: "1:502703780711:web:a4fd135178395b506735c2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase
