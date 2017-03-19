'use strict';

var url = require('url');

var Rules = require('./RulesService');

module.exports.rulesGET = function rulesGET(req, res, next) {
    Rules.rulesGET(req.swagger.params, res, next);
};

module.exports.rulesIdDELETE = function rulesIdDELETE(req, res, next) {
    Rules.rulesIdDELETE(req.swagger.params, res, next);
};

module.exports.rulesPOST = function rulesPOST(req, res, next) {
    Rules.rulesPOST(req.swagger.params, res, next);
};
