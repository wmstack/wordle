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

export default function wasm(params: object): Promise<Dictionary>