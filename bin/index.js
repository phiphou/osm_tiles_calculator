#!/usr/bin/env node

const fs = require('fs')
const utils = require('../lib/utils')

var argv = require('yargs')
  .usage('Usage: <command> [options]')
  .command('tilescalculator', 'Calculate tiles amount needed for a zoom level or range.')
  .example('tilescalculator -bounds -zooms', 'Calculate tiles amount needed for a zoom level or range.')
  .option('bounds', {
    alias: 'b',
    demandOption: true,
    describe: 'bounds in the form "lat1 lon1 lat2 lon2".',
    type: 'array'
  })
  .option('zooms', {
    alias: 'z',
    default: [0, 20],
    describe: 'zoom levels in the form "min_zom max_zoom".',
    type: 'array'
  })
  .option('out', {
    alias: 'o',
    describe: 'Write report in a .txt file. Default is tiles_count.txt',
    type: 'string'
  })
  .string('o')
  .check(check_args)
  .showHelpOnFail(false, 'Specify --help or -h for usage instructions')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright Phiphou 2017')
  .argv

function check_args(args, options) {
  check_bounds(args.bounds)
  check_zooms(args.zooms)
  return true
}

function check_bounds(bounds) {
  if (bounds.length == 0)
    throw "bounds must be specified with --bounds or -b."
  if (bounds.length != 4)
    throw "bounds must be defined with 4 space separated values."
  for (var i = 0; i < bounds.length; i++)
    if (typeof (bounds[i]) != 'number')
      throw "bounds must be defined with 4 numbers."
  if (bounds[0] > bounds[2])
    throw "lat1 must be lower than lat2."
  if (bounds[1] > bounds[3])
    throw "lon1 must be lower than lon2."
  if (bounds[0] < -85)
    throw "lat1 must be lower than -85°."
  if (bounds[2] > 85)
    throw "lat1 must be lower than 85°."
}

function check_zooms(zooms) {
  if (zooms.length == 0)
    throw "zooms must be specified with --zooms or -z."
  if (zooms.length > 2)
    throw "zooms must be defined with no more than 2 space separated values."
  for (var i = 0; i < zooms.length; i++)
    if (typeof (zooms[i]) != 'number')
      throw "zooms must be defined with number(s)."
  if (zooms[0] > zooms[1])
    throw "zoom1 must be lower than zoom2."
  if (zooms[0] < 0)
    throw "zooms1 must be greater than or equal to 0."
  if (zooms[1] > 22)
    throw "zooms2 must be lower than 22."
}

function tiles4zooms(bounds, minZ, maxZ = minZ) {
  let total = 0
  let output = `\r\nbounds: ${bounds}\r\nzoom(s): ${minZ}-${maxZ}\r\n\r\n`
  let i
  for (i = minZ; i <= maxZ; i++) {
    let count = utils.tiles4zoom(bounds, i)
    count = count == 0 ? 1 : count
    output += `zoom ${i}: ${utils.number_format(count)}\r\n`
    total += count
  }
  output += `\r\ntotal: ${utils.number_format(total)}`
  console.log(output)
  output = `Tiles Calculator\r\n${output}`
  if (argv.hasOwnProperty('o')) {
    let filename = argv.out || 'tiles_count'
    fs.writeFileSync(`${filename}.txt`, output, 'utf8')
  }
}

tiles4zooms(argv.bounds, argv.zooms[0], argv.zooms[1])
