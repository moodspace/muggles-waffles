// The MIT License (MIT)

// Proposed model implementation written in Sequelize.js | Copyright (c) 2017 Ke Qian

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {host: process.env.DB_HOST});

var Stack = sequelize.define('stack', {
    cx: Sequelize.DOUBLE, // rect center (anchor) x
    cy: Sequelize.DOUBLE, // rect center (anchor) y
    lx: Sequelize.DOUBLE, // rect size x
    ly: Sequelize.DOUBLE, // rect size y
    rotation: Sequelize.DOUBLE, // rect rotation
    geojson: Sequelize.TEXT('medium'), // fine shape
    oversize: Sequelize.BOOLEAN, // TINYINT, '0' '1', '2'
    startClass: Sequelize.STRING, // start class number 'QA'
    startSubclass: Sequelize.INTEGER, // start class number '67'
    endClass: Sequelize.STRING, // end class number 'QB',
    endSubclass: Sequelize.INTEGER // end class number '72'
});

var Floor = sequelize.define('floor', {
    name: Sequelize.STRING, // 'B1', 'G', '7'
    size_x: Sequelize.DOUBLE, // bounding box size x (to position stacks)
    size_y: Sequelize.DOUBLE, // bounding box size y (to position stacks)
    geojson: Sequelize.TEXT('medium') // fine shape
});

var Library = sequelize.define('library', {
    name: Sequelize.STRING, // 'Olin Library'
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE
});

Floor.hasMany(Stack);
Library.hasMany(Floor);

exports.DataSource = sequelize;
exports.Stack = Stack;
exports.Floor = Floor;
exports.Library = Library;
