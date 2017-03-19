'use strict';

var url = require('url');

var Libraries = require('./LibrariesService');

module.exports.librariesGET = function librariesGET(req, res, next) {
    Libraries.librariesGET(req.swagger.params, res, next);
};

module.exports.librariesIdDELETE = function librariesIdDELETE(req, res, next) {
    Libraries.librariesIdDELETE(req.swagger.params, res, next);
};

module.exports.librariesPOST = function librariesPOST(req, res, next) {
    Libraries.librariesPOST(req.swagger.params, res, next);
};

module.exports.librariesPUT = function librariesPUT(req, res, next) {
    Libraries.librariesPUT(req.swagger.params, res, next);
};
