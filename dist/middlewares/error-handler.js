"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrors(error, req, res, next) {
    console.error(error);
    res.status(500).render("shared/500");
}
exports.default = handleErrors;
//# sourceMappingURL=error-handler.js.map