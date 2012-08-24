#!/usr/bin/env node

"use strict";

var childProcess = require("child_process");

function opener(args, options, callback) {
    // http://stackoverflow.com/q/1480971/3191
    var command = process.platform === "win32" ? "cmd" :
                  process.platform === "darwin" ? "open" :
                  "xdg-open";

    if (typeof args === "string") {
        args = [args];
    }

    if (process.platform === "win32") {
        // Windows executables whose paths contain spaces need to be quoted.
        // But, if you double-quote the first parameter, 
        // then `start` it will interpret it as a window title, so you
        // need to add a dummy window title: http://stackoverflow.com/q/154075/#154090
        args = ["/c", "start", '""'].concat(args);
    }
    
    childProcess.execFile(command, args, options, callback);
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
