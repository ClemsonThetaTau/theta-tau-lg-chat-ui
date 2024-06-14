import * as admin from "firebase-admin";
import { env } from "$env/dynamic/private";
import path from "path";

// Path to your service account key
const serviceAccountPath = path.resolve(env.FIREBASE_ADMIN_KEY);

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccountPath),
	});
}

export default admin;
