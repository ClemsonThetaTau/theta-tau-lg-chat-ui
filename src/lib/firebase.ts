// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env as envPublic } from "$env/dynamic/public";

const firebaseConfig = JSON.parse(envPublic.FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
