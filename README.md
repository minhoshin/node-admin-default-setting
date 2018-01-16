# node-admin

## 인스톨 및 실행
$ npm i
<!--$ npm i -g-->
$ npm i -g pm2
$ rns

## pm2 json 실행
$ pm2 start processes.json(필요시 수정)

## pm2 cron 실행(15분 마다)
$ pm2 start app.js --cron "*/15 * * * *" 

## 환경 설정
$ export NODE_ENV=development
$ export NODE_ENV=production

## NODE_ENV 확인
repl 에서 env 입력

## EXPRESS DEBUG 실행
DEBUG=express:* nodemon app.js
DEBUG=express:router nodemon app.js
DEBUG=express:application,express:router node app.js

## DATABASE
http://expressjs.com/ko/guide/database-integration.html

## Session Redis
redis 설치
$ sudo apt-get install redis-server
redis 서버 시작
$ redis-server
redis 접속
$ redis-cli
redis 정상 구동 확인
127.0.0.1:6379> ping
PONG
전체 키 확인
127.0.0.1:6379> keys *
전체 키 삭제
127.0.0.1:6379> flushdb

## Nodemailer
https://nodemailer.com/about/
http://blog.saltfactory.net/send-mail-using-nodemailer/