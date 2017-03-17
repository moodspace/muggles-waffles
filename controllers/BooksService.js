'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var CallNumber = Model.CallNumber;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

exports.booksGET = function(args, res, next) {
    /**
     * Returns information about books at a given stack.
     *
     * stack_id Integer Stack to list books
     * returns List
     **/
    var ret = {};

    Book.findAll({
        where: {
            stackId: args.stack_id.value
        }
    }).then(function(books) {
        ret['application/json'] = books.map((d) => ({"id": d.get('id'), "ext_id": d.get('ext_id'), "stack": d.get('stackId')}));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.booksIdGET = function(args, res, next) {
    /**
     * Returns information about the book of the specified ID.
     *
     * id Integer ID of book
     * returns Book
     **/
    var ret = {};

    Book.findAll({
        where: {
            id: args.id.value
        }
    }).then(function(book) {
        ret['application/json'] = {
            "id": book.get('id'),
            "ext_id": book.get('ext_id'),
            "stack": book.get('stackId')
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });
};

exports.booksPOST = function(args, res, next) {
    /**
     * Adds a new book to the list.
     *
     * body Book Book with default ID to be added to the list
     * returns String
     **/
    var callno = args.body.value.callno;
    var re = /([A-z]{1,3})\s*(\d+(?:\.?\d+)*)\s*\.?([A-z]{1,3})\s*(\d+)\s+([^+\n]*)([+]*)/;
    var callno_dec = re.exec(callno);
    Book.create({ext_id: args.body.value.ext_id, callno: callno, stackId: args.body.value.stack}).then(function(book) {
        CallNumber.create({
            field: callno_dec[1],
            subfield: callno_dec[2],
            third_line_alpha: callno_dec[3],
            third_line_num: callno_dec[4],
            extra: callno_dec[5],
            oversize: callno_dec[6].length,
            bookId: book.get('id')
        });
    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });

    res.end();
};
