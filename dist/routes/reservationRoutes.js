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
const ReservationService = __importStar(require("../controllers/reservationController"));
const reservationRouter = express_1.default.Router();
// reservationRouter.get('/',  ReservationService.getAllReservations);
// // reservationRouter.get('/:id',  ReservationService.getReservation);
// reservationRouter.post('/',  ReservationService.createReservation);
// reservationRouter.patch('/:id',  ReservationService.updateReservation);
// reservationRouter.delete('/:id',  ReservationService.deleteReservation);
reservationRouter.get("/aktivneRezervacije", (req, res) => {
    res.render("rezervacije/aktivneRezervacije");
});
reservationRouter.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard");
});
///reservations/knjigePrekoracenje
reservationRouter.get("/knjigePrekoracenje", (req, res) => {
    res.render("rezervacije/knjigePrekoracenje");
});
reservationRouter.get("/arhiviraneRezervacije", (req, res) => {
    res.render("rezervacije/arhiviraneRezervacije");
});
// zamalo da zaboravim trazenje
reservationRouter.get("/search", passport_1.isLoggedIn, ReservationService.searchReservations);
exports.default = reservationRouter;
//# sourceMappingURL=reservationRoutes.js.map