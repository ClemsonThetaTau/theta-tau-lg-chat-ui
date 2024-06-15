// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env as envPublic } from "$env/dynamic/public";
import JSON5 from "json5";

const firebaseConfig = JSON5.parse(envPublic.PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
