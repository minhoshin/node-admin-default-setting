"use strict";

const co = require('co');
const _ = require('lodash');
const express = require('express');
const logger = global.logger;
const router = express.Router();

const commonConfig = require('./../config/common.config');
const authPermissionLib = require('./../lib/auth.permission.lib');
const middlewareLib = require('./../lib/middleware.lib');
const resSendLib = require('./../lib/res.send.lib');

/**
 * This is a comment.
 */
router.get('/', authPermissionLib.serviceAuth, (req, res) => {

    co(function*() {

        // res.render('');
        res.send('voyage page');

    }).catch((coErr) => {
        console.error('[' + new Date() + ']\n' + coErr);
        res.render('error');
    });
    
});

module.exports = router; 