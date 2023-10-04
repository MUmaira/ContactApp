import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyBRJDTD8a0u5cieFKMUZ0ZbOhiOQyiL3zU",
    authDomain: "react-contact-97eed.firebaseapp.com",
    projectId: "react-contact-97eed",
    storageBucket: "react-contact-97eed.appspot.com",
    messagingSenderId: "364912432814",
    appId: "1:364912432814:web:76673d5cd2a46f47107f3f"
  };
  
  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();