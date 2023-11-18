"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}
exports.default = addCsrfToken;
//# sourceMappingURL=csrf-token.js.map