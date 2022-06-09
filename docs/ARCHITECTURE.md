The entry point is `/public/index.html`, which includes `/public/global.css`, `/public/favicon.ico` and other such files.
It also imports the web-assembly bundle, made from `src-wasm/` through compilation with rollup.

# Tauri
Tauri is used to make an executable out of the file. It has global objects which the front-end tries to attach to. If that succeeds,
a hello world text file is supposed to be made.
