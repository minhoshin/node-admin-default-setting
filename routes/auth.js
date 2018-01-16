"use strict";

const co = require('co');
const _ = require('lodash');
const express = require('express');
const logger = global.logger;
const router = express.Router();

const commonConfig = require('./../config/common.config');
const adminMemberConfig = require('./../config/admin.member.config');
const authPermissionLib = require('./../lib/auth.permission.lib');
const signLib = require('./../lib/sign.lib');
const middlewareLib = require('./../lib/middleware.lib');
const resSendLib = require('./../lib/res.send.lib');

/**
 * This is a comment.
 */
router.get('/', (req, res) => {

    co(function*() {

        res.render('authIn');

    }).catch((coErr) => {
        console.error('[' + new Date() + ']\n' + coErr);
        res.render('error');
    });

});

/**
 * This is a comment.
 */
router.post('/', (req, res) => {

    const { id, password } = req.body;

    co(function*() {

        const query = {
            id: id,
            password: password
        };

        // let authAdminCheckResult = _.findIndex(adminMemberConfig.list, query);
        let authAdminCheckResult = _.find(adminMemberConfig.list, query);
        console.log(authAdminCheckResult);

        if(typeof authAdminCheckResult === 'object'){
            req.session.admin = {
                user: authAdminCheckResult.id,
                type: authAdminCheckResult.type
            };
        }else{
            console.log('로그인을 실패 하였습니다.');
        }

        res.redirect('/');

    }).catch((coErr) => {
        console.error('[' + new Date() + ']\n' + coErr);
        res.render('error');
    });

});

/**
 * This is a comment.
 */
router.get('/destory', signLib.signOut, (req, res) => {

    co(function*() {

        res.redirect('/');

    }).catch((coErr) => {
        console.error('[' + new Date() + ']\n' + coErr);
        res.render('error');
    });

});

module.exports = router;
