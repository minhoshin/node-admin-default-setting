"use strict";

/**
 * 관리자 세션 확인 라이브러리.
 */
// function serviceAuth(req, res, next){
let serviceAuth = (req, res, next) => {

    try{

        // 캐시값을 모두 삭제하여 뒤로 가기를 막는 기능.
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        
        // 적용
        if (req.session.admin) {
            if (req.session.admin.type === 'admin') {
                next();
            } else {
                return res.redirect('/auth');
            };
        } else {
            return res.redirect('/auth');
        };

    }catch(tryError){
        console.error(tryError);
        res.render('error');
    };

};
exports.serviceAuth = serviceAuth;