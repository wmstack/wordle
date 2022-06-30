/** This script is loaded by the index html file.
 * It is used to import the svelte app `App.svelte` and run it.
 * */
/// <reference types="svelte"/>
import App from './apps/App.svelte';
const app = new App({
	target: document.body,
	props: {

	}
});

export default app;