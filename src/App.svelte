<script lang="ts">
	// frontend documentation
	// https://tauri.studio/v1/api/js/modules/app
	import {app, fs} from "@tauri-apps/api";
	import Game from "./Game.svelte";

	let name: string = "Web";
	let menu = "home";
	app.getName().then((r) => name = r);
	fs.writeFile({
		contents: "hello, world!",
		path: "hello.txt"
	})
</script>

<main>
	<!-- the main menu -->
	{#if menu == "home"}
		<h1>Wordle!</h1>
		<h3> Client: {name} </h3>
		<div class="rw center">
			<div class="flex flex-col">
				<button on:click={() => menu = "game"}>Play</button>
				<button on:click={() => menu = "scores"}>Scores</button>
				<button on:click={() => window.close()}>Quit</button>
			</div>
		</div>
		
	<!-- the game menu -->
	{:else if menu == "game"}
		<Game></Game>
	<!-- the scores menu -->
	{:else if menu == "scores"}
		<h1> TODO </h1>
		<div></div>
	<!-- the non-existent menu -->
	{:else}
		<h1> Huh?</h1>
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