"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = require("../utils/passport");
const AuthorController = __importStar(require("../controllers/authorController"));
const AuthorRouter = express_1.default.Router();
AuthorRouter.get("/", AuthorController.getAllAuthors);
AuthorRouter.get("/:id", AuthorController.getAuthor);
AuthorRouter.get("/new-author", passport_1.isLoggedIn, (req, res) => {
    res.render("autori/noviAutor");
});
AuthorRouter.get("/edit-author", (req, res) => {
    res.render("autori/editAutor"); //mora da se prebaci u kontroler i da se ubace inf koje već postoje o autoru
});
AuthorRouter.post("/", passport_1.isLoggedIn, AuthorController.addAuthor);
AuthorRouter.patch("/:id", passport_1.isLoggedIn, AuthorController.updateAuthor); // You can use 'patch' for updating as well
AuthorRouter.delete("delete/:id", passport_1.isLoggedIn, AuthorController.deleteAuthor);
// middleware koji omogućava da se šalje delete request preko linka
AuthorRouter.use(function (req, res, next) {
    if (req.query._method == "DELETE") {
        req.method = "DELETE";
        req.url = req.path;
    }
    next();
});
exports.default = AuthorRouter;
//# sourceMappingURL=authorRoutes.js.map