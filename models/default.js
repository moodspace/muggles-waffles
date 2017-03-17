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
var sequelize = new Sequelize('library_nav', 'root', 'password');

var CallNumber = sequelize.define('callnumber', {
    // e.g. 'PR6051.D162 H6'
    field: Sequelize.STRING, // 'PR'
    subfield: Sequelize.DOUBLE, // '6051'
    third_line_alpha: Sequelize.STRING, // 'D'
    third_line_num: Sequelize.DOUBLE, // '162'
    extra: Sequelize.STRING, // 'H6'
    oversize: Sequelize.BOOLEAN // TINYINT, '0' '1', '2'
});

var Book = sequelize.define('book', {
    ext_id: Sequelize.INTEGER,
    callno: Sequelize.STRING
});

var Stack = sequelize.define('stack', {
    cx: Sequelize.DOUBLE, // rect center (anchor) x
    cy: Sequelize.DOUBLE, // rect center (anchor) y
    lx: Sequelize.DOUBLE, // rect size x
    ly: Sequelize.DOUBLE, // rect size y
    rotation: Sequelize.DOUBLE, // rect rotation
    geojson: Sequelize.TEXT('medium') // fine shape
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

Book.hasOne(CallNumber);
Stack.hasMany(Book);
Floor.hasMany(Stack);
Library.hasMany(Floor);

exports.DataSource = sequelize;
exports.CallNumber = CallNumber;
exports.Book = Book;
exports.Stack = Stack;
exports.Floor = Floor;
exports.Library = Library;
