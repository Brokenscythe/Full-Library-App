"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard');
});
router.get('/izdateKnjige', (req, res) => {
    res.render('rezervacije/aktivneRezervacije');
});
exports.default = router;
//# sourceMappingURL=mainRoutes.js.map