import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBvxrgLfgg4Y4wnDngnNO8Y_xHwtXT1yOI",
  authDomain: "crwn-db-5976c.firebaseapp.com",
  databaseURL: "https://crwn-db-5976c.firebaseio.com",
  projectId: "crwn-db-5976c",
  storageBucket: "crwn-db-5976c.appspot.com",
  messagingSenderId: "678640728031",
  appId: "1:678640728031:web:6a4c8604078d67ef7e366a",
  measurementId: "G-QM2DDCBEJC",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
