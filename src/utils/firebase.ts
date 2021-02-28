import firebase from 'firebase/app';
import 'firebase/auth'
import { useEffect, useState } from 'react';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB4R1Q0CmwMR3IPmw0hx2P9-kcoXZkYf2E",
  authDomain: "pkmn-app.firebaseapp.com",
  projectId: "pkmn-app",
  storageBucket: "pkmn-app.appspot.com",
  messagingSenderId: "259672784200",
  appId: "1:259672784200:web:8c0589736d2224d5ffc77d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signIn = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const signUp = (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const useUser = () => {
  
  const [user, setUser] = useState<firebase.User | null>()
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u))
  }, [])
  
  return user;
}