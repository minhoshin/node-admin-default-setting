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

        res.render('');

    }).catch((coErr) => {
        console.error('[' + new Date() + ']\n' + coErr);
        res.render('error');
    });
    
});

const authHandler = require('./auth');
const voyageHandler = require('./voyage');
const itineraryHandler = require('./itinerary');
const memberHandler = require('./member');

router.use('/auth', authHandler);
router.use('/voyage', voyageHandler);
router.use('/itinerary', itineraryHandler);
router.use('/member', memberHandler);

module.exports = router; 