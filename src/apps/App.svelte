<script lang="ts">
	// tauri documentation for the frontend
	// https://tauri.studio/v1/api/js/modules/app
	import {app, fs} from "@tauri-apps/api";
	import Game from "./Game.svelte";
	import Scores from "./Scores.svelte"

    // the backend.
	// By default, the backend is Web until Tauri is detected.
	let backend_name: "Tauri" | "Web" = "Web";
	// If we detect Tauri, switch backend_name to Tauri.
	app.getName().then((r) => backend_name = "Tauri").catch((err) => {
		console.log("[Developer] The frontend isn't running on tauri.")
	});

	// what menu we are in
	let menu: string = "home";
	function load_game() {
		menu = "game";
	}
	function load_scores() {
		menu = "scores";
	}
	function quit() {
		window.close()
	}

</script>

<main>
	<!-- the main menu -->
	{#if menu == "home"}
		<h1>Wordle!</h1>
		<h3> Client: {backend_name} </h3>
		<div class="rw center">
			<div class="flex flex-col">
				<button on:click={load_game}>Play</button>
				<button on:click={load_scores}>Scores</button>
				<button on:click={quit}>Quit</button>
			</div>
		</div>
		
	<!-- the game menu -->
	{:else if menu == "game"}
		<Game bind:menu={menu}></Game>
	<!-- the scores menu -->
	{:else if menu == "scores"}
		<Scores></Scores>
	<!-- the non-existent menu. If the menu is ever undefined, this menu would pop up, and I would know that an error happened. -->
	{:else}
		<h1> Huh? </h1>
	{/if}

</main>

<style lang="scss">
	.rw {
		width: 600px;
	}
	.center {
		align-items: center;
		margin: auto;
	}

	.flex {
		display: flex;
	}

	.flex-col {
		flex-direction: column;
	}
	button {
		min-width: 500px;
		background-color: cornsilk;
		font-size: 3em;
		font-weight: bold;
		&:hover {
			background-color: blanchedalmond;
		}
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
