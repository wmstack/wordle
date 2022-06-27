<script lang="ts">
    import {fs} from "@tauri-apps/api"
    export let scores: any[];
    export let menu: string;
    fs.readTextFile("scores.txt").then((res)=>{
        scores = scores.concat(JSON.parse(res))
    }, (rej) =>{
        console.log("[Developer] Failed to open scores.txt")
    })
    
</script>

{#each scores as score}
    <p> {score.date || ""} Guesses: {score.guesses || 0} </p>
{/each}
<button on:click={() => menu = "home"}> Main Menu</button>