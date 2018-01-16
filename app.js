"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();

/**
 * config.
 */
const commonConfig = require('./config/common.config');

/**
 * redis.
 * production 상태 일때만 실행
 */
const redis = require("redis");
if(process.env.NODE_ENV === 'production'){
    const client = redis.createClient(commonConfig.db.redis.port, commonConfig.db.redis.ip);
    // redis auth.
    // client.auth('password', function (err) {
    //     if (err) throw err;
    // });
    client.on("error", (redisErr) => {
        console.error('[' + new Date() + ']\n' + redisErr);
    });
};

/**
 * process.on.
 * 에러가 나도 실행.
 */
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

/**
 * logger.
 */
let now = new Date();
let nowYear = now.getFullYear();
let nowMonth = now.getMonth()+1;
let nowDate = now.getDate();
let loggerFileName = nowYear + '-' + nowMonth + '-' + nowDate;
const logger = require('morgan');
app.use(logger("combined"));
app.use(logger({
    format: 'default',
    stream: fs.createWriteStream('./log/access-'+loggerFileName+'.log', {'flags': 'a'})
}));

/**
 * NODE_ENV.
 */
const nodeEnvConfig = require('./config/node.env.json')[app.get('env')];
// $ export NODE_ENV=development
// $ export NODE_ENV=production

/**
 * bodyParser middleware.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/**
 * custom middleware.
 */
const middlewareLib = require('./lib/middleware.lib');
app.use(middlewareLib.customSendFunc); // Custom Send Function
const resSendLib = require('./lib/res.send.lib');
app.use(middlewareLib.customReqIp); // Custom Request Ip

/**
 * trust proxy.
 * http://expressjs.com/ko/guide/behind-proxies.html
 */
app.set('trust proxy', 'loopback') // specify a single subnet

/**
 * session middleware.
 */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
let sessionIfno = {
    secret: commonConfig.session.secretKey,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // expire 1 hour
};
// NODE_ENV=production 일 경우
if(process.env.NODE_ENV === 'production'){
    sessionIfno.store = new RedisStore({});
};
app.use(session(sessionIfno));

/**
 * view engine setting.
 */
app.set('views','./views');
app.set('view engine', 'ejs');

/**
 * static file setting.
 */
app.use(express.static(__dirname + '/public'));

/**
 * favicon middleware.
 */
const favicon = require('serve-favicon');
// app.use(favicon(__dirname + '/public/img/ico/favicon.ico'));

/**
 * repl.
 */
const repl = require('repl');
repl.start('> ').context.env = nodeEnvConfig; // env 입력시 ENV 정보 출력

/**
 * route all.
 */
app.all('*', (req, res, next) => {

    console.log('mandantary route');
    console.log('mandantary show ip address : ' + req.cIp);
    // all redis key, value
    if(process.env.NODE_ENV === 'production'){
        client.multi().keys('*', (err, keysAll) => {
            console.log("keys " + keysAll.length + " count");
            keysAll.forEach((key, index) => {
                // real redis data
                console.log("key " + index + ": " + key.toString());
                client.get(key, (err, content) => {
                    // explain data
                    if(content !== null){
                        console.log(content);
                    };
                });
            });
        }).exec((err, replies) => {
            if(err)
                console.error('[' + new Date() + ']\n' + err);
            // console.log(replies);
        });
    };
    next();

});

/**
 * route setting.
 */
const routes = require('./routes');
app.use('/', routes);

/**
 * route exception.
 */
app.get('*', (req, res) => {
    res.redirect('/');
});

/**
 * error Handler.
 */
 app.use(function (err, req, res) {
    console.error(err);
    if(err){
        console.error('[' + new Date() + ']\n' + err);
        res.cSend(resSendLib.getError());
    }
});

/**
 * server running.
 */
app.listen(nodeEnvConfig.port);
console.log(nodeEnvConfig.host + ":" + nodeEnvConfig.port + ", server running : " + Date());
console.log('NODE_ENV='+app.get('env'));
