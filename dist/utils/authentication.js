"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createUserSession(req, user, action) {
    const customSession = req.session;
    customSession.uid = user.id.toString();
    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
        }
        action();
    });
}
function destroyUserSession(req, res) {
    const customSession = req.session;
    customSession.uid = null;
    req.session.destroy((err) => {
        if (err) {
            console.error("Session destroy error:", err);
        }
        res.redirect("/login");
    });
}
exports.default = { createUserSession, destroyUserSession };
//# sourceMappingURL=authentication.js.map