'use strict';

var Model = require('../models/default.js');

var DataSource = Model.DataSource;
var Stack = Model.Stack;
var Rule = Model.Rule;

DataSource.sync();

var Errors = require('./Errors');

exports.rulesGET = function(args, res, next) {
    /**
   * Returns information about rules.
   *
   * returns List
   **/
    var examples = {};
    examples['application/json'] = [
        {
            "rule_id": 123,
            "call_number": "aeiou",
            "rule_type": "aeiou",
            "rule": "aeiou"
        }
    ];
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
        res.end();
    }
};

exports.rulesIdDELETE = function(args, res, next) {
    /**
   * Delete a rule.
   *
   * id Integer ID of rule
   * returns String
   **/
    var examples = {};
    examples['application/json'] = "aeiou";
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
        res.end();
    }
};

exports.rulesPOST = function(args, res, next) {
    /**
   * Adds a new rule.
   *
   * body Rule Rule with default ID to be added
   * returns String
   **/
    var examples = {};
    examples['application/json'] = "aeiou";
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
        res.end();
    }
};
