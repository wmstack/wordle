<script lang="ts">
	import wasm from "../src-wasm/Cargo.toml";
	import {app, dialog} from "@tauri-apps/api";
	import Game from "./Game.svelte";

	let name: string = "None";
	let menu = "home";
	app.getName().then((r)=> name = r)

	async function load() {
		let glob = await wasm({});
		glob.hello();
	}
	
	load();
</script>

<main>
	{#if menu == "home"}
		<h1>Wordle! {name}</h1>
		<div>
			<button on:click={()=> menu = "game"}>Play</button>
			<button>Scoreboard</button>
			<button on:click={()=>window.close()}>Quit</button>
		</div>
	{:else if menu == "game"}
		<Game></Game>
	{:else}
		<h1> Huh?</h1>
	{/if}
	
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