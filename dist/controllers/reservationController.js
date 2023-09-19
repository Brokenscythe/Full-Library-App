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
exports.searchReservations = exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getAllReservations = exports.getReservation = void 0;
const bookReservations_1 = __importDefault(require("../models/bookReservations"));
function getReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reservationId = parseInt(req.params.id);
        let reservation;
        try {
            reservation = yield bookReservations_1.default.getReservation(reservationId);
        }
        catch (error) {
            return next(error);
        }
        res.json({
            reservation: reservation,
        });
    });
}
exports.getReservation = getReservation;
function getAllReservations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allReservations = yield bookReservations_1.default.getAllReservations();
            res.json({
                reservations: allReservations,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllReservations = getAllReservations;
function createReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookId, reservationMadeForUserId, reservationMadeByUserId, closeUserId, closureReasonId, request_date, reservation_date, close_date, } = req.body;
        try {
            const reservation = yield bookReservations_1.default.createReservation(bookId, reservationMadeForUserId, reservationMadeByUserId, closeUserId, closureReasonId, request_date, reservation_date, close_date);
            res.json({
                message: "Kreirana je rezervacija",
                reservation: reservation,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.createReservation = createReservation;
function updateReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reservationId = parseInt(req.params.id);
        const { request_date, reservation_date, close_date, } = req.body;
        try {
            const reservation = yield bookReservations_1.default.getReservation(reservationId);
            reservation.request_date = request_date;
            reservation.reservation_date = reservation_date;
            reservation.close_date = close_date;
            yield reservation.updateReservation();
            res.json({
                message: "Rezervacija update-ovana",
                reservation: reservation,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateReservation = updateReservation;
function deleteReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reservationId = parseInt(req.params.id);
        try {
            const reservation = yield bookReservations_1.default.getReservation(reservationId);
            yield reservation.deleteReservation();
            res.json({
                message: "Rezervacija obrisana",
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteReservation = deleteReservation;
function searchReservations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookId, userId } = req.query;
        try {
            const parsedBookId = bookId ? parseInt(bookId) : undefined;
            const parsedUserId = userId ? String(userId) : undefined;
            const reservations = yield bookReservations_1.default.searchReservations(parsedBookId, parsedUserId);
            res.json({
                reservations: reservations,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.searchReservations = searchReservations;
//# sourceMappingURL=reservationController.js.map