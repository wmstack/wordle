<script lang="ts">
	import wasm from "../src-wasm/Cargo.toml";
  // wordle table size
  const ROWS = 6;
  const COLS = 5;

  // regular expression for matching a letter
  const REG = /^[A-Z]$/;

  // stores the data in the table
  let content = Array(ROWS).fill(0).map(()=>Array(COLS).fill(""));
  let feedback_arr = [];
  let letter_nums = 0 /* current col idx */
  let guesses = 0 /* current row idx */
  let secret_word: string;
  // import wasm code
  let wasm_loaded = false;
  let wasm_exports = undefined;

  async function load() {
		wasm_exports = await wasm({});
    wasm_loaded = true;
    secret_word = wasm_exports.random_word();
    console.log(`The secret word is ${secret_word}`)
	}
	load();

  // function to remove a single letter
  function del_letter() {
    if (letter_nums > 0) {
      letter_nums--;
      content[guesses][letter_nums] = "";
    }
  }

  // submit the currently written word 
  function submit_word(){
    console.log(1)
    if (letter_nums >= COLS && guesses < ROWS){
      // turn the text into a lower-case word
      let guess = content[guesses].join("").toLowerCase();
      console.log(guess, wasm_exports.is_word(guess))

      if (wasm_exports.is_word(guess)) {
        // go back to the first column
        letter_nums = 0;
        guesses++;

        let feedback = wasm_exports.feedback(guess, secret_word);
        feedback_arr.push(feedback);
        feedback_arr = feedback_arr;

        console.log(`${guess} is a word`) 
        
      }
    }
  }


  function try_read_key(ev) {
    let key = ev.key.toUpperCase();
    if (REG.test(key) && letter_nums < COLS) {
      content[guesses][letter_nums] = key;
      letter_nums++;
    }
  }


  function handle_key(ev) { 

    // match the keycode
    switch (ev.keyCode) {
      case 8: {
        /* backspace */
        del_letter()
        break;
      }
      case 13: {
        /* enter */

        // submitting a word requires wasm code
        if(!wasm_loaded) {
          console.log("Ignoring keystroke as WASM has not loaded yet.")
          return;
        }
        submit_word()
        break
      }
      default: {
        /* Try to read a key */
        try_read_key(ev)
      }
    }
  }
</script>

<svelte:window on:keydown={handle_key}/>

<h1>GAME</h1>
<table>
  {#each content as row, i}
    <tr>
      {#each row as col, j}
      <td 
        class:green= "{feedback_arr?.[i]?.[j] == 1}"
        class:yellow= "{feedback_arr?.[i]?.[j] == 2}"
        class:red= "{feedback_arr?.[i]?.[j] == 0}"  
      >
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
  .green {
    background-color: rgb(170, 226, 86);
  }
  .red {
    background-color: rgb(192, 27, 63);
  }
  .yellow {
    background-color: rgb(220, 235, 20);
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