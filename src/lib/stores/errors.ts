import { writable } from "svelte/store";

export const ERROR_MESSAGES = {
	default: "Oops, something went wrong.",
	authOnly: "You have to be logged in.",
	rateLimited: "You are sending too many messages. Try again later.",
	loginFailed: "Authentication Failed, Please Try Again!",
};

export const error = writable<string | null>(null);
