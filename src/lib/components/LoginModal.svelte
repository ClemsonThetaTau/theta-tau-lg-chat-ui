<script lang="ts">
	import { auth } from "$lib/firebase";
	import { page } from "$app/stores";
	import { base } from "$app/paths";
	import { signInWithEmailAndPassword } from "firebase/auth";

	let email = "";
	let password = "";
	let error = "";

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// (Optional) Store the session ID or token, if needed
			// Example: localStorage.setItem("sessionId", user.uid);

			window.location.href = base + "/"; // Redirect to homepage or dashboard
		} catch (err) {
			error = "Login failed, please try again.";
			console.error(err);
		}
	};
</script>

<Modal on:close>
	<div class="flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md">
		<h2 class="text-2xl font-semibold text-gray-800">Login</h2>
		<form on:submit={handleSubmit} class="mt-4 w-full max-w-sm">
			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					bind:value={email}
					required
					class="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none"
				/>
			</div>
			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					bind:value={password}
					required
					class="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none"
				/>
			</div>
			{#if error}
				<p class="mb-4 text-sm text-red-500">{error}</p>
			{/if}
			<button
				type="submit"
				class="w-full rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none hover:bg-blue-700"
				>Login</button
			>
		</form>
	</div>
</Modal>
