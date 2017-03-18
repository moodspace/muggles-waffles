'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var ClassNumber = Model.ClassNumber;
var Stack = Model.Stack;

DataSource.sync();

exports.classnumbersIdStackPUT = function(args, res, next) {
    /**
   * Assign a class number a stack
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
