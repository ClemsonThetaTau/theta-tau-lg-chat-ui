import * as admin from "firebase-admin";
import path from "path";

// Path to your service account key
const serviceAccountPath = path.resolve(
	"./theta-tau-lambda-gamma-firebase-adminsdk-50pfh-274cde6834.json"
);

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccountPath),
	});
}

export default admin;
