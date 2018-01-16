'use strict';

const SUCCESS_CODE = 'SUCCESS';
const ERROR_CODE = 'ERROR';
const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR';

/**
 * This is a comment.
 */
const CODE_NUMBER = {
    'SUCCESS' : 2000,
    'ERROR' : 5000,
    'UNKNOWN_ERROR_CODE' : 9999
};
exports.CODE_NUMBER = CODE_NUMBER;

/**
 * This is a comment.
 */
const CODE_STRING = {
    'SUCCESS' : '파라미터를 입력하세요.',
    'ERROR' : '서버에서 에러가 발생하였습니다. 계속 발생할 시 문의바랍니다.',
    'UNKNOWN_ERROR_CODE' : '정의되지 않은 에러입니다. 문제 발생 시 문의바랍니다.'
};
exports.CODE_STRING = CODE_STRING;

/**
 * This is a comment.
 */
exports.getSuccess = (data) => {
    let codeNum = CODE_NUMBER[SUCCESS_CODE];
    return {
        code : SUCCESS_CODE,
        codeno : codeNum,
        date : new Date(),
        data : data
    };
};

/**
 * This is a comment.
 */
exports.getError = (code) => {
    let c = code != null ? code : ERROR_CODE;
    let codeNum = CODE_NUMBER[c] || CODE_NUMBER[UNKNOWN_ERROR_CODE];
    let codeStr = CODE_STRING[c] || CODE_STRING[UNKNOWN_ERROR_CODE];

    return {
        code : c,
        codeno : codeNum,
        date : new Date(),
        msg : codeStr
    };
};