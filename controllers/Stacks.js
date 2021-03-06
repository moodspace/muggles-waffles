'use strict';

var url = require('url');

var Stacks = require('./StacksService');

module.exports.stacksGET = function stacksGET(req, res, next) {
    Stacks.stacksGET(req.swagger.params, res, next);
};

module.exports.stacksIdDELETE = function stacksIdDELETE(req, res, next) {
    Stacks.stacksIdDELETE(req.swagger.params, res, next);
};

module.exports.stacksIdGET = function stacksIdGET(req, res, next) {
    Stacks.stacksIdGET(req.swagger.params, res, next);
};

module.exports.stacksPOST = function stacksPOST(req, res, next) {
    Stacks.stacksPOST(req.swagger.params, res, next);
};

module.exports.stacksPUT = function stacksPUT(req, res, next) {
    Stacks.stacksPUT(req.swagger.params, res, next);
};
