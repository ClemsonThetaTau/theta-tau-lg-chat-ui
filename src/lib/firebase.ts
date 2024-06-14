// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env as envPublic } from "$env/dynamic/public";

const firebaseConfig = {
	apiKey: envPublic.PUBLIC_FIREBASE_API_KEY,
	authDomain: envPublic.PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: envPublic.PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: envPublic.PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: envPublic.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: envPublic.PUBLIC_FIREBASE_APP_ID,
	measurementId: envPublic.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
