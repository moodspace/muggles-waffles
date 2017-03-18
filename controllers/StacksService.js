'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

DataSource.sync();

exports.stacksGET = function(args, res, next) {
    /**
   * Returns information about stacks at a given floor.
   *
   * floor_id Integer Floor to list stacks
   * returns List
   **/
    var ret = {};

    Stack.findAll({
        where: {
            floorId: args.floor_id.value
        }
    }).then(function(stacks) {
        ret['application/json'] = stacks.map((d) => ({
            "id": d.get('id'),
            "cx": d.get('cx'),
            "cy": d.get('cy'),
            "lx": d.get('lx'),
            "ly": d.get('ly'),
            "rotation": d.get('rotation'),
            "geojson": d.get('geojson'),
            "floor": d.get('floorId')
        }));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.stacksIdGET = function(args, res, next) {
    /**
   * Returns information about the stack of the specified ID.
   *
   * id Integer ID of stack
   * returns Stack
   **/
    var ret = {};

    Stack.find({
        where: {
            id: args.id.value
        }
    }).then(function(stack) {
        ret['application/json'] = {
            "id": stack.get('id'),
            "cx": stack.get('cx'),
            "cy": stack.get('cy'),
            "lx": stack.get('lx'),
            "ly": stack.get('ly'),
            "rotation": stack.get('rotation'),
            "geojson": stack.get('geojson'),
            "floor": stack.get('floorId')
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.stacksPOST = function(args, res, next) {
    /**
   * Adds a new stack to the list
   *
   * body Stack Stack with default ID to be added to the list
   * returns String
   **/
    Stack.create({
        cx: args.body.value.cx,
        cy: args.body.value.cy,
        lx: args.body.value.lx,
        ly: args.body.value.ly,
        rotation: args.body.value.rotation,
        geojson: args.body.value.geojson,
        floorId: args.body.value.floor
    });
    res.end();
};
