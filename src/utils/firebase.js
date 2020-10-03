import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FB_DBURL,
  projectId: process.env.REACT_APP_FB_PID,
  storageBucket: process.env.REACT_APP_FB_SB,
  messagingSenderId: process.env.REACT_APP_FB_MSID,
  appId: process.env.REACT_APP_FB_APPID,
};

firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleUserLogin = async () =>
  await firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(({ credential: { accessToken, idToken }, user: { email, displayName, photoURL, uid } }) => ({
      accessToken,
      idToken,
      email,
      displayName,
      photoURL,
      uid,
    }))
    .catch(() => 'failed');

export const adminUserLogin = async (id, pwd) =>
  await firebase
    .auth()
    .signInWithEmailAndPassword(id, pwd)
    .then(({ user: { email, uid } }) => ({ email, uid }))
    .catch(() => 'User not found');

export const signOut = async () =>
  await firebase
    .auth()
    .signOut()
    .then(() => 'sign out')
    .catch(() => 'sign out');
