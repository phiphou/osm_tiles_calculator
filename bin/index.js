#!/usr/bin/env node

const fs = require('fs')
const utils = require('../lib/utils')
let argv = require('../lib/yargs').argv

function tiles4zooms(bounds, minZ, maxZ = minZ) {
  let total = 0
  let i
  let results = {
    bounds: bounds,
    zooms: [minZ, maxZ],
    tiles: [],
    total: null
  }

  for (i = minZ; i <= maxZ; i++) {
    let count = utils.tiles4zoom(bounds, i)
    count = count == 0 ? 1 : count
    results.tiles.push({
      zoom: i,
      count: count
    })
    total += count
  }

  results.total = total
  let output = utils.to_txt(results)
  console.log(output)
  if (argv.hasOwnProperty('o')) {
    if (argv.c)
      fs.writeFileSync(`${argv.out}.csv`, utils.to_csv(results), 'utf8')
    else
      fs.writeFileSync(`${argv.out}.txt`, output, 'utf8')
  }
}

tiles4zooms(argv.bounds, argv.zooms[0], argv.zooms[1])
