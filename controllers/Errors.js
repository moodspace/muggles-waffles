'use strict';

module.exports.emitDbError = function emitDbError(res, err) {
    res.end(err ? err.message : "Error");
};
