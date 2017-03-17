'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var CallNumber = Model.CallNumber;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

exports.searchGET = function(args, res, next) {
    /**
   * Returns information about objects of a given keyword. The response includes the display text of and reference to each object, and lists the objects in the proper display order.
   *
   * keyword String Keyword of search.
   * returns List
   **/
    var ret = {};

    var callno = args.callno.value;
    var re = /([A-z]{1,3})\s*(\d+(?:\.?\d+)*)\s*\.?([A-z]{1,3})\s*(\d+)\s+([^+\n]*)([+]*)/;
    var callno_dec = re.exec(callno);
    CallNumber.findAll({
        where: {
            $and: {
                field: callno_dec[1],
                subfield: callno_dec[2],
                third_line_alpha: callno_dec[3],
                third_line_num: callno_dec[4]
            }
        }
    }).then(function(books) {
        ret['application/json'] = books.map((d) => ({"result_type": "Book", "result_id": d.id, "result": d.callno}));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    });
};
