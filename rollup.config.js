import cjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default {
    entry: "src/main.js",
    format: "iife",
    moduleName: "DB",
    plugins: [ 
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        cjs(),
        builtins(),
        globals(),
    ],
    dest: "index.js"
};
