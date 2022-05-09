<script lang="ts">
	import {app, dialog} from "@tauri-apps/api";
	import Game from "./Game.svelte";

	let name: string = "Web";
	let menu = "home";
	app.getName().then((r) => name = r);
</script>

<main>
	<!-- the main menu -->
	{#if menu == "home"}
		<h1>Wordle!</h1>
		<h3> Client: {name} </h3>
		<div>
			<button on:click={() => menu = "game"}>Play</button>
			<button on:click={() => menu = "scores"}>Scores</button>
			<button on:click={() => window.close()}>Quit</button>
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