'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

DataSource.sync();

exports.searchGET = function(args, res, next) {
    /**
   * Returns information about objects of a given keyword. The response includes the display text of and reference to each object, and lists the objects in the proper display order.
   *
   * keyword String Keyword of search.
   * returns List
   **/
    var ret = {};

    Book.find({
        where: {
            callno: args.callno.value
        }
    }).then(function(book) {
        ret['application/json'] = {
            "result_type": "Book",
            "result_id": book.id,
            "result": book.callno
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    });
};
