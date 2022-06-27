<script lang="ts">
    import {fs} from "@tauri-apps/api"

    let scores = []
    fs.readTextFile("scores.txt").then((res)=>{
        scores = JSON.parse(res)
    }, (rej) =>{
        // mock scores.txt
        scores = JSON.parse('["a","e","g"]')
        console.log("[Developer] Failed to open scores.txt")
    })
    
</script>

{#each scores as score}
    <p> {score} </p>
{/each}	