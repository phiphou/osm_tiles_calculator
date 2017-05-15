[![npm](https://img.shields.io/npm/v/osm_tiles_calculator.svg)](https://www.npmjs.com/package/osm_tiles_calculator)
[![Dependency Status](https://david-dm.org/phiphou/osm_tiles_calculator.svg)](https://david-dm.org/phiphou/osm_tiles_calculator)
[![MIT license](https://img.shields.io/badge/Licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Size](https://reposs.herokuapp.com/?path=phiphou/osm_tiles_calculator)](#)

[![NPM](https://nodei.co/npm/osm_tiles_calculator.png?downloads=true&stars=true)](https://nodei.co/npm/osm_tiles_calculator/)


# Osm Tiles calculator

Calculte the amount of tiles needs for a given area and an optional zooms range.


## Install

With [npm](https://npmjs.org):

```
$ npm i osm_tiles_calculator -g
```

## Usage

```
$ osm_tiles_calculator -b -2 45 3 48
```
Try

```
$ osm_tiles_calculator --help for detailled usage instructions.

```
## Options

##### `-bounds` ( `-b` ) (required)

Bounds of the area for witch you want to calculate the tiles needed amount.

Bounds must be in the form *minLon minLat maxLon maxLat*

Latitudes must be lower that 85° and greater than -85°.

Example :
```
$ osm_tiles_calculator -b -2 45 3 48
```

##### `-zooms` ( `-z` ) (optional)

An optional option you can use to specify zoom or zoom range for the calculation. Default is range [0-20]

```
$ osm_tiles_calculator -b -2 45 3 48 -z 13
```

or

```
$ osm_tiles_calculator -b -2 45 3 48 -z 13 15
```

##### `-output` ( `-o` ) (optional)

An optional option you can use to generate a .txt file containing the tiles count report.

```
$ osm_tiles_calculator -b -2 45 3 48 -o
```
You can also specify the filename for the generated file :

```
$ osm_tiles_calculator -b -2 45 3 48 -o my_file
```

or

```
$ osm_tiles_calculator -b -2 45 3 48 -o "this is my file"
```

##### `-csv` ( `-c` ) (optional)

An optional option you can use to generate a .csv file containing the tiles count report rather than the default .txt file.

Must be used in conjunction with the `-out` ( `-o` ) flag.

```
$ osm_tiles_calculator -b -2 45 3 48 -o "my csv report" -c
```

## License

osm_tiles_calculator is available under the [MIT license](https://tldrlegal.com/license/mit-license).


## Contact

Copyright (C) 2017 Phiphou

[![@phiphou](https://img.shields.io/badge/github-phiphou-green.svg)](https://github.com/phiphou) [![@__phiphou__](https://img.shields.io/badge/twitter-__phiphou__-blue.svg)](https://twitter.com/__phiphou__)
