'use strict';

var url = require('url');

var Books = require('./BooksService');

module.exports.booksGET = function booksGET(req, res, next) {
    Books.booksGET(req.swagger.params, res, next);
};

module.exports.booksIdGET = function booksIdGET(req, res, next) {
    Books.booksIdGET(req.swagger.params, res, next);
};

module.exports.booksPOST = function booksPOST(req, res, next) {
    Books.booksPOST(req.swagger.params, res, next);
};
