import admin from "firebase-admin";
import { env } from "$env/dynamic/private";

if (!admin.apps.length) {
	const serviceAccount = JSON.parse(env.FIREBASE_ADMIN_KEY);
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

export default admin;