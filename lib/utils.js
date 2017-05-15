module.exports = {
  long2tile: function (lon, zoom) {
    return ((lon + 180) / 360 * Math.pow(2, zoom)) >> 0
  },
  lat2tile: function (lat, zoom) {
    const PI = Math.PI
    return ((1 - Math.log(Math.tan(lat * PI / 180) + 1 / Math.cos(lat * PI / 180)) / PI) / 2 * Math.pow(2, zoom)) >> 0
  },
  tiles4zoom: function (bounds, zoom) {
    let top_tile = this.lat2tile(bounds[0], zoom)
    let left_tile = this.long2tile(bounds[1], zoom)
    let bottom_tile = this.lat2tile(bounds[2], zoom)
    let right_tile = this.long2tile(bounds[3], zoom)
    let height = Math.abs(top_tile - bottom_tile) + 1
    let width = Math.abs(left_tile - right_tile)
    return width * height
  },
  num_format: function (number, sep = ' ') {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sep}`)
  },
  to_txt: function (res) {
    let zooms = res.zooms[0] === res.zooms[1] ? res.zooms[0] : `${res.zooms[0]}-${res.zooms[1]}`
    let output = `\r\nbounds: ${res.bounds}\r\nzoom(s): ${zooms}\r\n\r\n`
    for (var i = 0; i < res.tiles.length; i++)
      output += `zoom ${res.tiles[i].zoom}: ${this.num_format(res.tiles[i].count)}\r\n`
    output += `\r\ntotal: ${this.num_format(res.total)}`
    output = `OSM Tiles Calculator\r\n${output}`
    return output
  },
  to_csv: function (res) {
    let zooms = res.zooms[0] === res.zooms[1] ? res.zooms[0] : `${res.zooms[0]}-${res.zooms[1]}`
    let output = `bounds: ${res.bounds} zoom(s): ${zooms}\r\n\r\n`
    output += `zoom;count\r\n`
    for (var i = 0; i < res.tiles.length; i++)
    output += `${res.tiles[i].zoom};${this.num_format(res.tiles[i].count)}\r\n`
    output += `\r\ntotal;${this.num_format(res.total)}`
    output = `OSM Tiles Calculator;\r\n;\r\n${output}`
    return output
  }
}
