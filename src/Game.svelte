<script lang="ts">
  const ROWS = 6;
  const COLS = 5;
  // matching any letter from the keyboard.
  const REG = /^[A-Z]$/;

  let content = Array(ROWS).fill(0).map(()=>Array(COLS).fill(""));
  let letter_nums = 0 /* current col idx */
  let guesses = 0 /* current row idx */

  function add_letter(event) {
    // match the keycode
    switch (event.keyCode) {
      case 8: /* backspace */
        if (letter_nums > 0) {
          letter_nums--;
          content[guesses][letter_nums] = "";
        }
        break;
      case 13: /* enter */ 
        if (letter_nums >= COLS && guesses < ROWS){
          letter_nums = 0;
          guesses++;
        }
      default: /* Try to read a key */
        let key = event.key.toUpperCase();
        if (REG.test(key) && letter_nums < COLS) {
          content[guesses][letter_nums] = event.key.toUpperCase();
          letter_nums++;
        }
    }
  }
</script>

<svelte:window on:keydown={add_letter}/>

<h1>GAME</h1>
<table>
  {#each content as row, i}
    <tr>
      {#each row as col, j}
      <td>
        <span class:active="{i == guesses && j == letter_nums - 1}">
          {col}
        </span>
      </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  .active {
    color: gold;
  }
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