"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const csurf_1 = __importDefault(require("csurf"));
//ROUTES
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import bookRoutes from "./routes/bookRoutes";
// import mainRoutes from "./routes/mainRoutes";
//SESSION CONFIG
const session_1 = __importDefault(require("./config/session"));
//MIDDLEWARES
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const check_auth_1 = __importDefault(require("./middlewares/check-auth"));
const csrf_token_1 = __importDefault(require("./middlewares/csrf-token"));
const app = (0, express_1.default)();
const PORT = 3000;
//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
//SERVING STATIC FILES
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.urlencoded({ extended: false }));
const sessionConfig = (0, session_1.default)();
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, csurf_1.default)());
app.use(csrf_token_1.default);
app.use(check_auth_1.default);
//Routes
app.use(authRoutes_1.default);
// app.use(mainRoutes);
// app.use(bookRoutes);
app.use(error_handler_1.default);
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});
//# sourceMappingURL=app.js.map