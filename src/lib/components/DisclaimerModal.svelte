<script lang="ts">
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { env as envPublic } from "$env/dynamic/public";
	import LogoHuggingFaceBorderless from "$lib/components/icons/LogoHuggingFaceBorderless.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { useSettingsStore } from "$lib/stores/settings";
	import { error, ERROR_MESSAGES } from "$lib/stores/errors";
	import { cookiesAreEnabled } from "$lib/utils/cookiesAreEnabled";
	import Logo from "./icons/Logo.svelte";

	import { auth } from "$lib/firebase";
	import { signInWithEmailAndPassword } from "firebase/auth";

	const settings = useSettingsStore();
</script>

<Modal>
	<div
		class="from-primary-500/40 via-primary-500/10 to-primary-500/0 flex w-full flex-col items-center gap-6 bg-gradient-to-b px-5 pb-8 pt-9 text-center sm:px-6"
	>
		<h2 class="flex items-center text-2xl font-semibold text-gray-800">
			<Logo classNames="mr-1" />
			{envPublic.PUBLIC_APP_NAME}
		</h2>

		<p class="text-lg font-semibold leading-snug text-gray-800" style="text-wrap: balance;">
			{envPublic.PUBLIC_APP_DESCRIPTION}
		</p>

		<p class="text-sm text-gray-500">
			{envPublic.PUBLIC_APP_DISCLAIMER_MESSAGE}
		</p>

		{#if $error}
			<p class="text-lg font-semibold leading-snug text-gray-800 text-red-500">
				{$error}
			</p>
		{/if}

		<div class="flex w-full flex-col items-center gap-2">
			{#if $page.data.guestMode || !$page.data.loginEnabled}
				<button
					class="w-full justify-center rounded-full border-2 border-gray-300 bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-gray-900"
					class:bg-white={$page.data.loginEnabled}
					class:text-gray-800={$page.data.loginEnabled}
					class:hover:bg-slate-100={$page.data.loginEnabled}
					on:click|preventDefault|stopPropagation={() => {
						if (!cookiesAreEnabled()) {
							window.open(window.location.href, "_blank");
						}

						$settings.ethicsModalAccepted = true;
					}}
				>
					{#if $page.data.loginEnabled}
						Try as guest
					{:else}
						Start chatting
					{/if}
				</button>
			{/if}
			{#if $page.data.loginEnabled}
				<form
					class="w-full"
					on:submit|preventDefault|stopPropagation={async (event) => {
						const form = event.target;
						const formData = new FormData(form);
						const username = formData.get("username");
						const password = formData.get("password");

						try {
							const userCredential = await signInWithEmailAndPassword(
								auth,
								username,
								password
							).catch((e) => {
								console.error("Authentication failed");
								error.set(ERROR_MESSAGES.loginFailed);
							});

							// If the login fails let the user know
							if (!userCredential.user) {
								return;
							}

							const idToken = await userCredential.user.getIdToken();

							const response = await fetch("/login", {
								method: "POST",
								headers: {
									"Content-Type": "application/x-www-form-urlencoded",
								},
								body: new URLSearchParams({ idToken }),
							});

							if (!response.ok) {
								// Handle response error if needed
								console.error("Authentication failed");
								console.error(response.statusText);
								return;
							} else {
								// Redirect or handle successful login
								window.location.href = "/"; // Adjust the URL to your desired post-login page
								$settings.ethicsModalAccepted = true;
							}
						} catch (error) {
							console.error("Error during login:", error);
						}
					}}
				>
					<div class="mb-4">
						<input
							name="username"
							type="text"
							class="w-full rounded border border-gray-300 p-2"
							placeholder="Username"
							required
						/>
					</div>

					<div class="mb-4">
						<input
							name="password"
							type="password"
							class="w-full rounded border border-gray-300 p-2"
							placeholder="Password"
							required
						/>
					</div>

					<button
						type="submit"
						class="flex w-full items-center justify-center whitespace-nowrap rounded-full border-2 border-black bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-gray-900"
					>
						Sign in
						{#if envPublic.PUBLIC_APP_NAME === "HuggingChat"}
							with <LogoHuggingFaceBorderless classNames="text-xl mr-1 ml-1.5 flex-none" /> Hugging Face
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</Modal>
