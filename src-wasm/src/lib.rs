use wasm_bindgen::prelude::*;
pub mod words;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn hello() {
    log("Hello, World");
}