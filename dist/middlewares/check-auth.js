"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;
    if (!uid) {
        return next();
    }
    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();
}
exports.default = checkAuthStatus;
//# sourceMappingURL=check-auth.js.map