"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSessionData(req) {
    const session = req.session;
    session.data = session.data || {};
    const sessionData = session.data.flashedData;
    session.data.flashedData = null;
    return sessionData;
}
function flashDataToSession(req, data, action) {
    const session = req.session;
    session.data = session.data || {};
    session.data.flashedData = data;
    session.save(action);
}
exports.default = { getSessionData, flashDataToSession };
//# sourceMappingURL=session-flash.js.map