'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

DataSource.sync();

var Errors = require('./Errors');

exports.searchGET = function(args, res, next) {
    /**
   * Returns information about objects of a given keyword. The response includes the display text of and reference to each object, and lists the objects in the proper display order.
   *
   * keyword String Keyword of search.
   * returns List
   **/
    var ret = {};
    var re = /([A-z]{1,3})(\d+(?:\.[A-z]*\d+)*)\s+\.?([A-z])(\d+)\s+([^+]*)([+]*)/;
    var callno_dec = re.exec(args.keyword.value);
    var oversize = callno_dec[6].length;

    classSearch(res, callno_dec[1], callno_dec[2].split('.')[0], oversize);
};

function classSearch(res, class_code, subclass, oversize) {
    var ret = {};

    Stack.findAll({
        where: {
            $and: [

                {
                    $or: [
                        {
                            startClass: {
                                $lt: class_code
                            }
                        }, {
                            $and: [
                                {
                                    startClass: {
                                        $eq: class_code
                                    }
                                }, {
                                    startSubclass: {
                                        $lte: subclass
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    $or: [
                        {
                            endClass: {
                                $gt: class_code
                            }
                        }, {
                            $and: [
                                {
                                    endClass: {
                                        $eq: class_code
                                    }
                                }, {
                                    endSubclass: {
                                        $gte: subclass
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    oversize: oversize
                }
            ]
        }
    }).then(function(stacks) {
        ret['application/json'] = stacks.map(function(stack) {
            return {
                "result_type": "Stack",
                "result_id": stack.id,
                "result": [
                    stack.startClass,
                    stack.startSubclass,
                    stack.endClass,
                    stack.endSubclass,
                    stack.oversize
                ].join(', ')
            };
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    });
}
