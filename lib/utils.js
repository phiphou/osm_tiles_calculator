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
  number_format: function (number, sep = ' ') {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sep}`)
  }
}
