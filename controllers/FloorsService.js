'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

DataSource.sync();

exports.floorsGET = function(args, res, next) {
    /**
   * Returns information about floors at a given library.
   *
   * library_id Integer Library to list floors
   * returns List
   **/
    var ret = {};

    Floor.findAll({
        where: {
            libraryId: args.library_id.value
        }
    }).then(function(floors) {
        ret['application/json'] = floors.map((d) => ({
            "id": d.get('id'),
            "name": d.get('name'),
            "size_x": d.get('size_x'),
            "size_y": d.get('size_y'),
            "geojson": d.get('geojson'),
            "library": d.get('libraryId')
        }));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.floorsIdGET = function(args, res, next) {
    /**
   * Returns information about the floor of the specified ID.
   *
   * id Integer ID of floor
   * returns Floor
   **/
    var ret = {};

    Floor.find({
        where: {
            id: args.id.value
        }
    }).then(function(floor) {
        ret['application/json'] = {
            "id": floor.get('id'),
            "name": floor.get('name'),
            "size_x": floor.get('size_x'),
            "size_y": floor.get('size_y'),
            "geojson": floor.get('geojson'),
            "library": floor.get('libraryId')
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.floorsPOST = function(args, res, next) {
    /**
   * Adds a new floor to the list
   *
   * body Floor Floor with default ID to be added to the list
   * returns String
   **/
    Floor.create({name: args.body.value.name, size_x: args.body.value.size_x, size_y: args.body.value.size_y, geojson: args.body.value.geojson, libraryId: args.body.value.library});
    res.end();
};
