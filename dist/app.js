"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const csurf_1 = __importDefault(require("csurf"));
const method_override_1 = __importDefault(require("method-override"));
const body_parser_1 = __importDefault(require("body-parser"));
//ROUTES
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const librarianRoutes_1 = __importDefault(require("./routes/librarianRoutes"));
//SESSION CONFIG
const session_1 = __importDefault(require("./config/session"));
//MIDDLEWARES
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const check_auth_1 = __importDefault(require("./middlewares/check-auth"));
const csrf_token_1 = __importDefault(require("./middlewares/csrf-token"));
const email_verification_check_1 = __importDefault(require("./middlewares/email-verification-check"));
// import ReservationRouter from "./routes/reservationRoutes";
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const protect_routes_1 = __importDefault(require("./middlewares/protect-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)("_method"));
const PORT = 3000;
//parsira req.body
app.use(body_parser_1.default.json());
//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
//SERVING STATIC FILES
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const sessionConfig = (0, session_1.default)();
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, csurf_1.default)());
app.use(csrf_token_1.default);
app.use(check_auth_1.default);
//ROUTES
app.use("/", authRoutes_1.default);
app.use("/", protect_routes_1.default, mainRoutes_1.default);
app.use("/", protect_routes_1.default, email_verification_check_1.default, userRoutes_1.default);
app.use("/", protect_routes_1.default, email_verification_check_1.default, librarianRoutes_1.default);
app.use("/books", protect_routes_1.default, email_verification_check_1.default, bookRoutes_1.default);
app.use("/authors", protect_routes_1.default, email_verification_check_1.default, authorRoutes_1.default);
app.use("/", protect_routes_1.default, email_verification_check_1.default, settingsRoutes_1.default);
// app.use("/reservations", ReservationRouter);
app.use(error_handler_1.default);
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});
//# sourceMappingURL=app.js.map