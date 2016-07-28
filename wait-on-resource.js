#!/usr/bin/env node

var waitOn = require('wait-on'),
    sprintf = require('sprintf-js').sprintf,
    readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    }),
    args = process.argv.slice(2)

if (args.length > 1) {
  console.error(sprintf('Usage: %s [resource-to-wait-on]', process.argv[1]))
  process.exit(1)
}

if (args.length == 1) {
  wait(args[0])
} else {
  readline.on('line', function(line) {
    readline.close()
    wait(line)
  })
}

function wait(resource) {
  waitOn({resources: [resource], timeout: 30000}, function(err) {
    if (err) { 
      console.error(sprintf('Gave up waiting for %s, err was %s', resource, err)) 
      process.exit(1)
    }
  })
}
