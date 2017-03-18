'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var ClassNumber = Model.ClassNumber;
var Book = Model.Book;
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

    if (args.type.value.toLowerCase() === "class" || args.type.value.toLowerCase() === "classnumber") {
        var re = /([A-z\?]{1,3})([A-z0-9\?]+(?:\.[A-z0-9\?]+)*)\s+([^+]*)([+]*)/;
        var callno_dec = re.exec(args.keyword.value);

        var class_char = callno_dec[1].charAt(0);
        if (class_char === "?") {
            class_char = '_';
        }
        var subclasses = callno_dec[1].split('.');
        subclasses = subclasses.map(function(subclass) {
            return subclass.replace('\?', '_').replace('\*+', '%');
        });
        var oversize = callno_dec[4].length;

        classSearch(res, class_char, subclasses, oversize);
        return;
    }
    Book.find({
        where: {
            callno: args.keyword.value
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

function classSearch(res, class_char, subclasses, oversize) {
    var ret = {};

    ClassNumber.findAll({
        where: {
            class: {
                $like : class_char
            },
            subclass: {
                $like: subclasses[0] ? subclasses[0] : '%'
            },
            subclass2: {
                $like: subclasses[1] ? subclasses[1] : '%'
            },
            subclass3: {
                $like: subclasses[2] ? subclasses[2] : '%'
            },
            subclass4: {
                $like: subclasses[3] ? subclasses[3] : '%'
            },
            oversize: oversize
        }
    }).then(function(classnumbers) {
        ret['application/json'] = classnumbers.map(function(classno) {
            return {
                "result_type": "Class",
                "result_id": classno.id,
                "result": [
                    classno.class,
                    classno.subclass,
                    classno.subclass2,
                    classno.subclass3,
                    classno.subclass4,
                    classno.oversize
                ].join(', ')
            };
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    });
}
