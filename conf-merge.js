#!/usr/bin/env node

var fs = require('fs'),
    sprintf = require('sprintf-js').sprintf,
    nconf = require('nconf'),
    merge = require('merge'),
    args = process.argv.slice(2),
    file = args[0]

if (args.length != 1) {
  console.log(sprintf('Usage: %s <conf.yaml>', process.argv[1]))
  process.exit(1)
}

if (!fs.existsSync(file)) {
  console.log(sprintf('Specified yaml config does not exist: %s', file))
  process.exit(1)
}

nconf.formats.yaml = require('nconf-yaml')

nconf
  .env({
    lowerCase: true,
    separator: '__',
    match: /^(postgres|dns_resolvers_available)__.+/,
    whitelist: ['database']
  })
  .file({
    file: args[0],
    format: nconf.formats.yaml
  })

nconf.load (function (err) {
  if (err) { throw err }
  // nasty hack to merge file and env stores, until https://github.com/indexzero/nconf/issues/218 is resolved
  nconf.stores.file.store = merge.recursive(nconf.stores.file.store, nconf.stores.env.store)
  nconf.save(function (err) {
    if (err) { throw err }
  })
})
