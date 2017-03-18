'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var ClassNumber = Model.ClassNumber;
var Book = Model.Book;
var Stack = Model.Stack;
var Floor = Model.Floor;
var Library = Model.Library;

DataSource.sync();

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
    var re = /([A-z]{1,3})(\d+(?:\.[A-z]*\d+)*)\s*\.?([A-z])(\d+)\s+([^+]*)([+]*)/;
    var callno_dec = re.exec(callno);
    var newBook = Book.create({ext_id: args.body.value.ext_id, callno: callno, stackId: args.body.value.stack}).then(function(book) {
        // add existing call number class / create new class
        var cid = -1;
        var classno = {
            class: callno_dec[1].charAt(0),
            subclass: callno_dec[1],
            subclass2: callno_dec[2].split('.')[0],
            subclass3: callno_dec[2].split('.')[1],
            subclass4: callno_dec[2].split('.')[2],
            oversize: callno_dec[6].length
        };
        ClassNumber.find({where: classno}).then(function(c) {
            if (!c) {
                ClassNumber.create(classno).then(function(c) {
                    updateBookClassNumber(book.id, c.id);
                });
            } else {
                updateBookClassNumber(book.id, c.id);
            }
        });

    }, function(reason) {
        res.end(reason ? reason.message : "Error");
    });

    res.end();
};

function updateBookClassNumber(bid, cid) {
    Book.update({
        classnumberId: cid
    }, {
        where: {
            id: bid
        }
    });
}
