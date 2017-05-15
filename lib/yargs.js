const default_filename = 'tiles_count'

exports.argv = require('yargs')
  .usage('Usage: <command> [options]')
  .command('tilescalculator', 'Calculate tiles amount needed for a zoom level or range.')
  .example('tilescalculator -bounds 2,46,3,48 -zooms 10-17', 'Calculate tiles amount needed for a zoom level or range.')
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
    describe: 'Write report in a .txt file. Default is tiles_count.txt. Use -o your_file to change it.',
    type: 'string'
  })
  .string('o')
  .option('csv', {
    alias: 'c',
    describe: 'Write report in a .csv file rather than the defaut txt format. Default is tiles_count.csv. Must be used in conjonction with -out.',
    type: 'boolean'
  })
  .boolean('c')
  .check(check_args)
  .implies('csv', 'out')
  .showHelpOnFail(false, 'Specify --help or -h for usage instructions')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright Phiphou 2017')
  .argv

function check_args(args, options) {
  check_bounds(args.bounds)
  check_zooms(args.zooms)
  if (args.o === '')
    args.o = args.out = default_filename
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
