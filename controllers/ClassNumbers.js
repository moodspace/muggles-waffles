'use strict';

var url = require('url');

var ClassNumbers = require('./ClassNumbersService');

module.exports.classnumbersIdStackGET = function classnumbersIdStackGET(req, res, next) {
    ClassNumbers.classnumbersIdStackGET(req.swagger.params, res, next);
};

module.exports.classnumbersIdStackPUT = function classnumbersIdStackPUT(req, res, next) {
    ClassNumbers.classnumbersIdStackPUT(req.swagger.params, res, next);
};
