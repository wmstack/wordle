use lazy_static::lazy_static;
use wasm_bindgen::prelude::*;
use js_sys;
use rand::seq::SliceRandom;

// create a word list
lazy_static! {
  static ref WORD_LIST: Vec<&'static str> = include_str!("../../assets/sgb-words.txt")
    .split("\r\n")
    .collect();
}

#[wasm_bindgen]
pub fn is_word(word: &str) -> bool {
  return WORD_LIST.contains(&word.trim());
}

#[wasm_bindgen]
pub fn random_word() -> String {
  WORD_LIST.choose(&mut rand::thread_rng()).unwrap().to_string()
}
// Wordle letter feedback enum.
#[derive(Clone, Copy, PartialEq)]
#[repr(u8)]
#[wasm_bindgen]
pub enum LetterFeedback {
  NotFound, /* the letter of the guess is not found in the secret word */
  Exact, /* the letter is found, at the correct index */
  Mismatch /* the letter is found in an incorrect position */
}

// give wordle style letter by letter feedback on a character.
#[wasm_bindgen]
pub fn feedback(guess_word: &str, secret_word: &str) -> js_sys::Array<> {
  let mut answers = vec![LetterFeedback::NotFound; 5];

  // correctly colour all the exact matches
  for (idx, letter) in secret_word.chars().enumerate() {
    if guess_word.chars().nth(idx).unwrap() == letter {
      answers[idx] = LetterFeedback::Exact;
    }
  }

  // colour any other letters yellow. This can't be done with the first loop because of
  // an edge case.
  for (idx, letter) in secret_word.chars().enumerate() {
    // Only colour a matching letter once.
    if answers[idx] == LetterFeedback::Exact {
      continue;
    }
    
    // color the yellow matches
    if let Some(pos) = guess_word.chars().enumerate().position(
      |(i, c)| answers[i] == LetterFeedback::NotFound && c == letter
    ) {
      answers[pos] = LetterFeedback::Mismatch
    }

  }
  answers.iter().map::<JsValue, _>(|i| (*i as u8).into()).collect()
}