"use strict";

/**
 * This is a comment.
 */
const commonConfig = {

  db : {
    redis : {
      port : 6379,
      ip : '127.0.0.1'
    }
  },

  session : {
    secretKey : 'tlsalsgh!dldPwls$tlswldn@##!'
  }

};
module.exports = commonConfig;