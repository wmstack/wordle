/** I use this interface so that when I import the Rust library code through typescript,
 *  I get the interface through which I can call webassembly code */

/** feedback type for letters.
 * 0 represents a letter which isn't found.
 * 1 represents a letter which is an exact match.
 * 2 represents a letter which is in the incorrect spot.
 */
type Feedback = 0 | 1 | 2

declare interface Dictionary {
    /** 
     * Determine if the input word is part of the dictionary of allowed words.
     * @param word the word to check.
    */
    is_word(word: string): boolean
    
    /**
     * Generate a random word from the dictionary.
     * @returns a random word.
     */
    random_word(): string

    /**
     * Geneate feedback from a guess word and a secret word
     * @param secret_word the secret word
     * @param guess_word the word that is compared
     * @returns feedback
     */
    feedback(guess_word, secret_word): Feedback[]
}

// when you import the web-assembly library, you typically import a function which returns a promise to the API.
export default function wasm(params: object): Promise<Dictionary>