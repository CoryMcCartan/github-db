import cjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";

export default {
    entry: "src/main.js",
    format: "iife",
    plugins: [ 
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        cjs(),
        builtins(),
    ],
    dest: "index.js"
};
