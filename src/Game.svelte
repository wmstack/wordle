<script lang="ts">
  const ROWS = 6;
  const COLS = 5;
  let content = Array(ROWS).fill(0).map(()=>Array(COLS).fill(""));
  let pos = 0
  function add_letter(event) {
    if (event.keyCode == 8) {
      // handle backspace
      pos--;
      content[0][pos] = "";
    } else if (pos < 5) {
      // handle other characters
      content[0][pos] = event.key.toUpperCase();
      pos++;
    }
  }
</script>

<svelte:window on:keydown={add_letter}/>

<h1>GAME</h1>
<table>
  {#each content as row}
    <tr>
      {#each row as col}
      <td>
        <span>
          {col}
        </span>
      </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    margin-left: auto;
    margin-right: auto;
  }
  td {
    background-color: cornsilk;
    width: 3em;
    height: 3em;
  }
  span {
    background-color: transparent;
    font-size: 2em;
    color: black;
    font-weight: bold;
  }
</style>