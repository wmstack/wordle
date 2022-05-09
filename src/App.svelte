<script lang="ts">
	import wasm from "../src-wasm/Cargo.toml";
	import {app, dialog} from "@tauri-apps/api";

	let name: string;
	app.getName().then((r)=> name = r)

	async function load() {
		let glob = await wasm({});
		glob.hello();
	}
	
	load();
</script>

<main>
	<h1>Hello {name}!</h1>
	<h1>{name}</h1>
	<!-- <h1>{Tauri}</h1> -->
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>