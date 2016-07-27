#!/usr/bin/env node

var fs = require('fs'),
    sprintf = require('sprintf-js').sprintf,
    yaml = require('js-yaml'),
    args = process.argv.slice(2),
    file = args[0]

if (args.length != 1) {
  console.error(sprintf('Usage: %s <conf.yaml>', process.argv[1]))
  process.exit(1)
}

if (!fs.existsSync(file)) {
  console.error(sprintf('Specified yaml config does not exist: %s', file))
  process.exit(1)
}

try {
  var conf = yaml.safeLoad(fs.readFileSync(file)),
      database = conf.database || 'cassandra'
  switch(database) {
    case 'postgres':
      console.log(sprintf('tcp:%s:%s', conf.postgres.host, conf.postgres.port))
      break
    default:
      console.log(sprintf('Specified database is not supported: %s', database))
      process.exit(1)
  }
} catch (e) {
  console.error(sprintf('Could not load yaml config: %s\n%s', file, e))
  process.exit(1)
}
 
