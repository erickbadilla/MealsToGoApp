import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth/react-native";
import { initializeApp, getApps } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXLWlH4LW0WjmKcQKSvgK35JJ9KhupDFs",
  authDomain: "mealstogo-12157.firebaseapp.com",
  projectId: "mealstogo-12157",
  storageBucket: "mealstogo-12157.appspot.com",
  messagingSenderId: "92573259742",
  appId: "1:92573259742:web:3c985a93cf4270e03cef4f",
};

//Prevents app from laoding this two or more times while hot reloading
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);

  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const Auth = getAuth();

export const loginRequest = (email: string, password: string) =>
  signInWithEmailAndPassword(Auth, email, password);

export const registerRequest = async (
  email: string,
  password: string,
  repeatedPassword: string
) => {
  if (password !== repeatedPassword) {
    throw new Error("Error: Passwords do not match");
  }

  return await createUserWithEmailAndPassword(Auth, email, password);
};

export const getAuthentication = () => getAuth();
