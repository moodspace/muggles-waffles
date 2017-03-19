'use strict';

var url = require('url');

var Floors = require('./FloorsService');

module.exports.floorsGET = function floorsGET(req, res, next) {
    Floors.floorsGET(req.swagger.params, res, next);
};

module.exports.floorsIdDELETE = function floorsIdDELETE(req, res, next) {
    Floors.floorsIdDELETE(req.swagger.params, res, next);
};

module.exports.floorsIdGET = function floorsIdGET(req, res, next) {
    Floors.floorsIdGET(req.swagger.params, res, next);
};

module.exports.floorsPOST = function floorsPOST(req, res, next) {
    Floors.floorsPOST(req.swagger.params, res, next);
};

module.exports.floorsPUT = function floorsPUT(req, res, next) {
    Floors.floorsPUT(req.swagger.params, res, next);
};
