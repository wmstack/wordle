<script lang="ts">
    export let scores: any[];
    export let menu: string;

</script>

{#each scores as score}
    <p> {score.date || ""} Guesses: {score.guesses || 0} </p>
{/each}
<button on:click={() => menu = "home"}> Main Menu</button>