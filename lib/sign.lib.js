"use strict";

/**
 * 전체 세션 삭제 라이브러리.
 */
// function signOut(req, res, next){
let signOut = (req, res, next) => {

    try{

        // 캐시값을 모두 삭제하여 뒤로 가기를 막는 기능.
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        
        // 전체 세션 삭제
        req.session.destroy();
        next();
    
    }catch(tryError){
        console.error(tryError);
        res.render('error');
    };

};
exports.signOut = signOut;