import { redirect } from "@sveltejs/kit";
import { base } from "$app/paths";
import { z } from "zod";
import admin from "$lib/firebaseAdmin";
import { updateUser } from "./updateUser"; // Adjust the path according to your project structure

export const actions = {
	async default({ url, locals, request, cookies, getClientAddress }) {
		// Extract the token passed in the request (assuming it's a POST request with JSON body)
		const formData = await request.formData();

		// Extract the idToken
		const idToken = formData.get("idToken");

		// Validate the idToken using zod
		const { idToken: validatedIdToken } = z
			.object({
				idToken: z.string().optional(),
			})
			.parse({ idToken });

		try {
			// Verify the Firebase ID token
			const decodedToken = await admin.auth().verifyIdToken(idToken);

			// Get the user data from Firebase token
			const userData = {
				email: decodedToken.email,
				name: decodedToken.name,
				picture: decodedToken.picture,
				sub: decodedToken.uid,
				// Add other userInfo attributes if needed
			};

			// Determine the user's IP address
			const userAgent = request.headers.get("user-agent") ?? undefined;
			const ip = getClientAddress();

			// Update user using the provided updateUser function
			await updateUser({
				userData,
				locals,
				cookies,
				userAgent,
				ip,
			});

			// Redirect the user to the intended page after login
			redirect(303, `${base}/dashboard`);
		} catch (error) {
			console.error("Error during Firebase authentication:", error);
			// Handle the error, e.g. by redirecting to an error page or displaying an error message
			throw redirect(303, `${base}/login?error=auth_error`);
		}
	},
};
