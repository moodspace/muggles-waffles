'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var ClassNumber = Model.ClassNumber;
var Stack = Model.Stack;

DataSource.sync();

var Stacks = require('./StacksService');
var Errors = require('./Errors');

exports.classnumbersIdStackGET = function(args, res, next) {
    /**
   * Get stack info based on class number.
   *
   * id Integer ID of class number
   * returns Stack
   **/
    var ret = {};

    ClassNumber.find({
        where: {
            id: args.id.value
        }
    }).then(function(classno) {
        Stacks.stacksIdGET({
            id: {
                value: classno.get("stackId")
            }
        }, res, next);
    }, function(reason) {
        Errors.emitDbError(res, reason);
    });
};

exports.classnumbersIdStackPUT = function(args, res, next) {
    /**
   * Assign a class number a stack.
   *
   * id Integer ID of class number
   * stack_id Integer Stack to add to the class number
   * returns String
   **/
    updateClassNumberStack(args.id.value, args.stack_id.value);
    res.end();
};

function updateClassNumberStack(cid, sid) {
    ClassNumber.update({
        stackId: sid
    }, {
        where: {
            id: cid
        }
    });
}
