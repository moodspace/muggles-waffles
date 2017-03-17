'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var CallNumber = Model.CallNumber;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

exports.librariesGET = function(args, res, next) {
    /**
   * Returns information about libraries.
   *
   * returns List
   **/
    var ret = {};

    Library.findAll().then(function(libraries) {
        ret['application/json'] = libraries.map((d) => ({"id": d.get('id'), "name": d.get('name'), "latitude": d.get('latitude'), "longitude": d.get('longitude')}));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.librariesPOST = function(args, res, next) {
    /**
   * Adds a new library to the list.
   *
   * body Library Library with default ID to be added to the list
   * returns String
   **/
    Library.create({name: args.body.value.name, latitude: args.body.value.latitude, longitude: args.body.value.longitude});
    res.end();
};
