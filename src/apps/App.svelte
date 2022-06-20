<script lang="ts">
	// tauri documentation for the frontend
	// https://tauri.studio/v1/api/js/modules/app
	import {app, fs} from "@tauri-apps/api";
	import Game from "./Game.svelte";

    // the name of the backend, which can either be Tauri or Web. We are not using Electron as a backend.
	// By default, the backend is Web until Tauri is detected.
	let backend_name: "Tauri" | "Web" = "Web";
	// If we detect Tauri, switch backend_name to Tauri, otherwise notify us in the developer's console.
	app.getName().then((r) => backend_name = "Tauri").catch((err) => {
		console.log("[Developer] The frontend isn't running on tauri.")
	});

	// what menu we are in
	let menu: string = "home";
	function load_game() {
		menu = "game";
	}

	let scores = []
	function load_scores() {
		menu = "scores";

		function fulfilled(data: string) {
			console.log("[Developer] Succeeded in finding scores", data);
			scores = JSON.parse(data);
		}
		function rejected(err: any) {
			console.log(`[Developer] Failed to load scores.txt`, err);
		}
		fs.readTextFile("scores.txt").then(fulfilled, rejected);

		fs.writeFile({
			contents: "hello, world!",
			path: "hello.txt"
		}).catch((err) => {
			console.log("[Developer] Can't create a file on a non-tauri backend.")
		})
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
		<Game></Game>
	<!-- the scores menu -->
	{:else if menu == "scores"}
		<div class = "rw center">
			{#each scores as score}
				<p> {score} </p>
			{/each}	
		</div>
		
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
