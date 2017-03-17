'use strict';

var url = require('url');

var Search = require('./SearchService');

module.exports.searchGET = function searchGET(req, res, next) {
    Search.searchGET(req.swagger.params, res, next);
};
