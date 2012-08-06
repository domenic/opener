#!/usr/bin/env node

"use strict";

var childProcess = require("child_process");

function opener(args, options, callback) {
    // http://stackoverflow.com/q/1480971/3191
    var command = process.platform === "win32" ? "start" :
                  process.platform === "darwin" ? "open" :
                  "xdg-open";
                  
    if (typeof args === "string") {
        args = [args];
    }

    childProcess.exec(command + " " + args.join(" "), options, callback);
}

// Export `opener` for programmatic access.
// You might use this to e.g. open a website: `opener("http://google.com")`
module.exports = opener;

// If we're being called from the command line, just execute, using the command-line arguments.
if (require.main && require.main.id === module.id) {
    opener(process.argv.slice(2), function (error) {
        if (error) {
            throw error;
        }
    });
}
