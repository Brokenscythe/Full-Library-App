"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: "cortexprojectlibrary@gmail.com",
        pass: process.env.EMAIL_PASS,
    },
});
transport.verify(function (error) {
    if (error) {
        console.error("Error connecting to email service:", error);
    }
    else {
        console.log("Connected to email service.");
    }
});
transport.on("error", function (error) {
    console.error("Email transport error:", error);
});
exports.default = transport;
//# sourceMappingURL=email.js.map