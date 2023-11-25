"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function protectRoutes(req, res, next) {
    if (!res.locals.isAuth) {
        return res.redirect("/401");
    }
    next();
}
exports.default = protectRoutes;
//# sourceMappingURL=protect-routes.js.map