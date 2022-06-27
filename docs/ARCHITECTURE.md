The entry point is `/public/index.html`, which includes `/public/global.css`, `/public/favicon.ico` and other such files.
It also imports the web-assembly bundle, made from `src-wasm/` through compilation with rollup.

# Tauri
Tauri is used to make an executable out of the file. It has global objects which the front-end tries to attach to. If that succeeds,
a hello world text file is supposed to be made.

# Bundled and As-Is files
The files inside `/public/` are all served as is. However, on compiling, svelte files and wasm files are going to be compiled to objects
in the `/public/` directory. When the `/public/` directory is served with `sirv`, those are correctly loaded.