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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class BookReservation {
    constructor(id, book, reservationMadeForUser, reservationMadeByUser, closeUser, closureReason, reservationStatuses, request_date, reservation_date, close_date) {
        this.id = id;
        this.book = book;
        this.reservationMadeForUser = reservationMadeForUser;
        this.reservationMadeByUser = reservationMadeByUser;
        this.closeUser = closeUser;
        this.closureReason = closureReason;
        this.reservationStatuses = reservationStatuses;
        this.request_date = request_date;
        this.reservation_date = reservation_date;
        this.close_date = close_date;
    }
    static getAllReservations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservations = yield db.reservation.findMany({
                    include: {
                        book: true,
                        reservationMadeForUser: true,
                        reservationMadeByUser: true,
                        closeUser: true,
                        closureReason: true,
                        reservationStatuses: true,
                    },
                });
                return reservations.map((reservation) => {
                    return new BookReservation(reservation.id, reservation.book, reservation.reservationMadeForUser, reservation.reservationMadeByUser, reservation.closeUser, reservation.closureReason, reservation.reservationStatuses, reservation.request_date, reservation.reservation_date, reservation.close_date);
                });
            }
            catch (error) {
                throw new Error(`Error fetching reservations: ${error.message}`);
            }
        });
    }
    static getReservation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to fetch the reservation with the provided ID
                const reservation = yield db.reservation.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        book: true,
                        reservationMadeForUser: true,
                        reservationMadeByUser: true,
                        closeUser: true,
                        closureReason: true,
                        reservationStatuses: true,
                    },
                });
                // If the reservation is not found, throw an error
                if (!reservation) {
                    throw new Error(`Reservation with ID ${id} not found.`);
                }
                // Create and return a BookReservation object based on the fetched data
                return new BookReservation(reservation.id, reservation.book, reservation.reservationMadeForUser, reservation.reservationMadeByUser, reservation.closeUser, reservation.closureReason, reservation.reservationStatuses, reservation.request_date, reservation.reservation_date, reservation.close_date);
            }
            catch (error) {
                // If an error occurs during the process, throw an error with a message
                throw new Error(`Error fetching reservation: ${error.message}`);
            }
        });
    }
    static createReservation(bookId, reservationMadeForUserId, reservationMadeByUserId, closeUserId, closureReasonId, request_date, reservation_date, close_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservation = yield db.reservation.create({
                    data: {
                        bookId,
                        reservationMadeForUserId,
                        reservationMadeByUserId,
                        closeUserId,
                        closureReasonId,
                        request_date,
                        reservation_date,
                        close_date,
                    },
                    include: {
                        book: true,
                        reservationMadeForUser: true,
                        reservationMadeByUser: true,
                        closeUser: true,
                        closureReason: true,
                        reservationStatuses: true,
                    },
                });
                return new BookReservation(reservation.id, reservation.book, reservation.reservationMadeForUser, reservation.reservationMadeByUser, reservation.closeUser, reservation.closureReason, reservation.reservationStatuses, reservation.request_date, reservation.reservation_date, reservation.close_date);
            }
            catch (error) {
                throw new Error(`Error creating reservation: ${error.message}`);
            }
        });
    }
    updateReservation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the reservation exists
                const existingReservation = yield db.reservation.findUnique({
                    where: {
                        id: this.id,
                    },
                });
                if (!existingReservation) {
                    throw new Error(`Reservation with ID ${this.id} not found.`);
                }
                // Update the reservation
                const updatedReservation = yield db.reservation.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        request_date: this.request_date,
                        reservation_date: this.reservation_date,
                        close_date: this.close_date,
                    },
                    include: {
                        book: true,
                        reservationMadeForUser: true,
                        reservationMadeByUser: true,
                        closeUser: true,
                        closureReason: true,
                        reservationStatuses: true,
                    },
                });
                return new BookReservation(updatedReservation.id, updatedReservation.book, updatedReservation.reservationMadeForUser, updatedReservation.reservationMadeByUser, updatedReservation.closeUser, updatedReservation.closureReason, updatedReservation.reservationStatuses, updatedReservation.request_date, updatedReservation.reservation_date, updatedReservation.close_date);
            }
            catch (error) {
                throw new Error(`Error updating reservation: ${error.message}`);
            }
        });
    }
    deleteReservation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the reservation exists
                const existingReservation = yield db.reservation.findUnique({
                    where: {
                        id: this.id,
                    },
                });
                if (!existingReservation) {
                    throw new Error(`Reservation with ID ${this.id} not found.`);
                }
                // Delete the reservation
                yield db.reservation.delete({
                    where: {
                        id: this.id,
                    },
                });
            }
            catch (error) {
                throw new Error(`Error deleting reservation: ${error.message}`);
            }
        });
    }
    static searchReservations(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservations = yield db.reservation.findMany({
                    where: {
                        bookId: bookId,
                        reservationMadeForUserId: userId,
                    },
                    include: {
                        book: true,
                        reservationMadeForUser: true,
                        reservationMadeByUser: true,
                        closeUser: true,
                        closureReason: true,
                        reservationStatuses: true,
                    },
                });
                return reservations.map((reservation) => {
                    return new BookReservation(reservation.id, reservation.book, reservation.reservationMadeForUser, reservation.reservationMadeByUser, reservation.closeUser, reservation.closureReason, reservation.reservationStatuses, reservation.request_date, reservation.reservation_date, reservation.close_date);
                });
            }
            catch (error) {
                throw new Error(`Error searching reservations: ${error.message}`);
            }
        });
    }
}
exports.default = BookReservation;
//# sourceMappingURL=bookReservations.js.map