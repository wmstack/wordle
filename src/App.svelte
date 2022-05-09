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
	<h1>Wordle!</h1>
	<div>
		<button>Play</button>
		<button>Scoreboard</button>
		<button>Quit</button>
	</div>
</main>

<style>
	button {
		min-width: 500px;
		background-color: cornsilk;
		font-size: 3em;
		font-weight: bold;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: cornsilk;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: bold;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>