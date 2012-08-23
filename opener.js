#!/usr/bin/env node

"use strict";

var childProcess = require("child_process");

function opener(args, options, callback) {
    if (typeof args === "string") {
        args = [args];
    }

    // http://stackoverflow.com/q/1480971/3191
    var command;
    switch (process.platform) {
    case "win32":
        command = "start";
        /*
        Windows command "start" takes the first argument in quotes 
        as a window title, but not as a file or command.

        http://stackoverflow.com/q/154075/#154090
        */
        args.unshift("\"\"");
        break;
    case "darwin":
        command = "open";
        break;
    default:
        command = "xdg-open";
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
