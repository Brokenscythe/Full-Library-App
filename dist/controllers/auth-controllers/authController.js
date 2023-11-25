"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.getResetPassword = exports.forgotPassword = exports.getForgotPassword = exports.login = exports.confirmRegistration = exports.signup = exports.getLogIn = exports.getRegister = void 0;
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Models
const userModel_1 = __importDefault(require("../../models/userModel"));
const userLogins_1 = __importDefault(require("../../models/userLogins"));
// Utils
const authentication_1 = __importDefault(require("../../utils/authentication"));
const validation_1 = __importDefault(require("../../utils/validation"));
const session_flash_1 = __importDefault(require("../../utils/session-flash"));
//Email-Confirmation
const email_1 = __importDefault(require("../../utils/email"));
function getRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            if (!sessionData) {
                sessionData = {
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    JMBG: "",
                };
            }
            res.render("auth/register", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRegister = getRegister;
function getLogIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            if (!sessionData) {
                sessionData = {
                    email: "",
                    password: "",
                };
            }
            res.render("auth/login", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getLogIn = getLogIn;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const enteredData = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body["confirm_password"],
            JMBG: req.body.jmbg,
        };
        const confirmationToken = (0, uuid_1.v4)();
        console.log(enteredData);
        const newUser = new userModel_1.default({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            JMBG: req.body.jmbg,
            confirmation_token: confirmationToken,
            created_at: new Date(),
            updated_at: new Date(),
        });
        try {
            const existsAlready = yield newUser.existsAlready();
            if (existsAlready) {
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "User already exists! Please check your username,email and JMBG!" }, enteredData), function () {
                    res.redirect("/register");
                });
                return;
            }
            if (!validation_1.default.userDetailsAreValid(req.body.username, req.body.name, req.body.email, req.body.password)) {
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please check your input. Password must be at least 6 characters long and username 4!" }, enteredData), function () {
                    res.redirect("/register");
                });
                return;
            }
            if (!validation_1.default.passwordIsConfirmed(req.body.password, req.body["confirm_password"])) {
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please make sure your passwords match." }, enteredData), function () {
                    res.redirect("/register");
                });
                return;
            }
            yield newUser.save();
            const confirmationLink = `http://localhost:3000/confirm/${confirmationToken}`;
            yield email_1.default.sendMail({
                from: "cortexprojectlibrary@gmail.com",
                to: newUser.email,
                subject: "Potvrdi svoju registraciju.",
                html: `
        <h1 style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 24px; text-align: center;">Provjera sigurnosti</h1>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Poštovani ${newUser.name},</p>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Da biste potvrdili svoju registraciju, pritisnite na sledeći link:</p>
        <a href="${confirmationLink}" style="font-family: 'Helvetica Neue', sans-serif; color: #007BFF; font-size: 16px; text-decoration: none; display: block; text-align: center;">Pritisnite ovdje da potvrdite registraciju</a>
      `,
            });
            console.log(confirmationLink);
            console.log("Registration successful. Confirmation email sent.");
        }
        catch (error) {
            console.error("Error during registartion:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.redirect("/login");
    });
}
exports.signup = signup;
function confirmRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.params.token;
        try {
            console.log(token);
            yield userModel_1.default.findUserToken(token);
            res.redirect("/login");
        }
        catch (error) {
            console.error("Error during confirmation:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.confirmRegistration = confirmRegistration;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            session_flash_1.default.flashDataToSession(req, { error_message: "Email and password are required." }, function () {
                res.redirect("/login");
            });
        }
        else {
            const checkUser = new userModel_1.default({ email, password });
            let existingUser;
            try {
                existingUser = yield checkUser.hasMatchingEmail();
            }
            catch (error) {
                return next(error);
            }
            const sessionErrorData = {
                error_message: "Invalid credentials, please check your email and password!",
                email: email,
                password: password,
            };
            if (!existingUser) {
                session_flash_1.default.flashDataToSession(req, sessionErrorData, function () {
                    res.redirect("/login");
                });
            }
            else {
                const passwordIsCorrect = yield checkUser.hasMatchingPassword(existingUser.password);
                if (!passwordIsCorrect) {
                    session_flash_1.default.flashDataToSession(req, sessionErrorData, function () {
                        res.redirect("/login");
                    });
                }
                else {
                    try {
                        yield userLogins_1.default.logLoginAttempt(existingUser.id);
                        yield userModel_1.default.updateLoginCount(existingUser.id);
                        yield userModel_1.default.updateLastLoginAt(existingUser.id);
                        authentication_1.default.createUserSession(req, existingUser, function () {
                            res.redirect("/");
                        });
                    }
                    catch (error) {
                        console.error("Error during login:", error);
                        res.status(500).json({ error: "Internal server error" });
                    }
                }
            }
        }
    });
}
exports.login = login;
function getForgotPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            if (!sessionData) {
                sessionData = {
                    email: "",
                };
            }
            res.render("auth/forgotPassword.ejs", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getForgotPassword = getForgotPassword;
function forgotPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = new userModel_1.default({ email: email });
            const existingUser = yield user.hasMatchingEmail();
            if (!existingUser) {
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Nismo mogli pronaći korisnika sa tim e-mailom." }, email), function () {
                    res.redirect("/forgot-password");
                });
                return;
            }
            console.log("User with provided email has been found");
            try {
                const secret = process.env.PASS_SECRET + existingUser.password;
                const payload = {
                    email: existingUser.email,
                    id: existingUser.id,
                };
                const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "15m" });
                const link = `http://localhost:3000/reset-password/${existingUser.id}/${token}`;
                yield email_1.default.sendMail({
                    from: "cortexprojectlibrary@gmail.com",
                    to: existingUser.email,
                    subject: "Promjena lozinke",
                    html: `
        <h1 style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 24px; text-align: center;">Promjena Lozinke</h1>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Poštovani ${existingUser.name},</p>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Da biste promijenili svoju lozinku, pritisnite na sledeći link:</p>
        <a href="${link}" style="font-family: 'Helvetica Neue', sans-serif; color: #007BFF; font-size: 16px; text-decoration: none; display: block; text-align: center;">Pritisnite ovdje da promjenite lozinku</a>
        `,
                });
                console.log("Email sent to the client");
            }
            catch (emailError) {
                console.error("Error sending email:", emailError);
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Error sending email. Please try again later." }, email), function () {
                    res.redirect("/forgot-password");
                });
                return;
            }
            session_flash_1.default.flashDataToSession(req, Object.assign({ successful_message: `E-mail sa linkom za promjenu lozinke je poslat na ${existingUser.email}.` }, email), function () {
                res.redirect("/forgot-password");
            });
            return;
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.forgotPassword = forgotPassword;
function getResetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, token } = req.params;
        console.log(token);
        console.log(`This is ${id} extracted, this is ${token} extracted from req.params`);
        let errorData = session_flash_1.default.getSessionData(req);
        if (!errorData) {
            errorData = {
                error_message: "",
            };
        }
        try {
            const existingUser = yield userModel_1.default.hasMatchingId(Number(id));
            console.log(existingUser);
            if (!existingUser) {
                res.send("Invalid id...");
                console.log("User with that id isn't found");
                return;
            }
            const secret = process.env.PASS_SECRET + existingUser.password;
            console.log(`Token during verification: ${token}`);
            console.log(`Secret during verification: ${secret}`);
            jsonwebtoken_1.default.verify(token, secret, (err) => {
                if (err) {
                    console.error("Error verifying token:", err);
                    return next(err);
                }
                console.log("Token verification successful");
                res.render("auth/reset-password", { user: existingUser, inputData: errorData });
            });
        }
        catch (error) {
            if (error instanceof Error)
                console.log(error.message);
            return next(error);
        }
    });
}
exports.getResetPassword = getResetPassword;
function resetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, token } = req.params;
        const { password, password2 } = req.body;
        console.log(`This is ${id} extracted, this is ${token} extracted from req.params`);
        let existingUser;
        let userWithNewPassword;
        try {
            existingUser = yield userModel_1.default.getUser(Number(id));
            if (!existingUser) {
                res.status(405).redirect("/405");
                return;
            }
            const secret = process.env.PASS_SECRET + existingUser.password;
            try {
                const payload = jsonwebtoken_1.default.verify(token, secret);
                const link = `http://localhost:3000/reset-password/${existingUser === null || existingUser === void 0 ? void 0 : existingUser.id}/${token}`;
                if (!validation_1.default.passwordIsConfirmed(password, password2)) {
                    session_flash_1.default.flashDataToSession(req, {
                        error_message: "Upozorenje, lozinke se ne poklapaju!",
                    }, function () {
                        res.redirect(`${link}`);
                    });
                    return;
                }
                console.log(`This is my payload: ${payload},
                    This is the user: ${existingUser}`);
                userWithNewPassword = new userModel_1.default({
                    id: Number(id),
                    name: existingUser.name,
                    username: existingUser.username,
                    email: existingUser.email,
                    password: password,
                    JMBG: existingUser.JMBG,
                    typeId: existingUser.typeId,
                    confirmation_token: existingUser.confirmation_token,
                });
                console.log(userWithNewPassword);
                yield userWithNewPassword.save();
            }
            catch (error) {
                return next(error);
            }
            console.log(`User ID during password reset: ${id}
                extracted users id: ${existingUser.id}`);
            res.redirect("/login");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.resetPassword = resetPassword;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        authentication_1.default.destroyUserSession(req, res);
    });
}
exports.logout = logout;
//# sourceMappingURL=authController.js.map