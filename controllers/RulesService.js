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
    var ret = {};

    Rule.findAll().then(function(rules) {
        ret['application/json'] = rules.map((d) => ({"rule_id": d.get('id'), "rule_type": d.get('type'), "call_number": d.get('callNumber'), "rule": d.get('rule')}));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ret[Object.keys(ret)[0]] || {}, null, 2));
    }, function(reason) {
        Errors.emitDbError(res, reason);
    });
};

exports.rulesIdDELETE = function(args, res, next) {
    /**
   * Delete a rule.
   *
   * id Integer ID of rule
   * returns String
   **/
    Rule.destroy({
        where: {
            id: args.id.value
        }
    });
};

exports.rulesPOST = function(args, res, next) {
    /**
   * Adds a new rule.
   *
   * body Rule Rule with default ID to be added
   * returns String
   **/
    Rule.create({type: args.body.value.rule_type, callNumber: args.body.value.call_number, rule: args.body.value.rule});
    res.end();
};
