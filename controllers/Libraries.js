'use strict';

var url = require('url');

var Libraries = require('./LibrariesService');

module.exports.librariesGET = function librariesGET(req, res, next) {
    Libraries.librariesGET(req.swagger.params, res, next);
};

module.exports.librariesPOST = function librariesPOST(req, res, next) {
    Libraries.librariesPOST(req.swagger.params, res, next);
};
