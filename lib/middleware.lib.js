'use strict';

const internalIp = require('internal-ip');

/**
 * This is a comment.
 */
let customSendFunc = (req, res, next) => {
// function customSendFunc(req, res, next) {
    res.cSend = function(data) {
        return res.send(data);
    };
    next();
}
exports.customSendFunc = customSendFunc;

/**
 * This is a comment.
 */
let customReqIp = (req, res, next) => {
    req.cIp = internalIp.v4.sync();
    next();
}
exports.customReqIp = customReqIp;