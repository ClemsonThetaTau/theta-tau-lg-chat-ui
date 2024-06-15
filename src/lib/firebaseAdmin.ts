import admin from "firebase-admin";
import { env } from "$env/dynamic/private";

console.log("env.FIREBASE_ADMIN_KEY", env.FIREBASE_ADMIN_KEY);

if (!admin.apps.length) {
	const serviceAccount = JSON.parse(env.FIREBASE_ADMIN_KEY);
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export default admin;
