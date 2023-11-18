import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

import { User, Book, CancellationReason, ReservationStatus } from "@prisma/client";

export class Reservation {
  id: number;
  book: Book;
  reservationMadeForUser: User;
  reservationMadeByUser: User;
  closeUser: User;
  closureReason: CancellationReason;
  reservationStatuses: ReservationStatus[];
  request_date: Date;
  reservation_date: Date;
  close_date: Date;

  constructor(
    id: number,
    book: Book,
    reservationMadeForUser: User,
    reservationMadeByUser: User,
    closeUser: User,
    closureReason: CancellationReason,
    reservationStatuses: ReservationStatus[],
    request_date: Date,
    reservation_date: Date,
    close_date: Date
  ) {
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

  static async getAllReservations() {
      const reservations = await db.reservation.findMany({
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
        return new Reservation(
          reservation.id,
          reservation.book,
          reservation.reservationMadeForUser,
          reservation.reservationMadeByUser,
          reservation.closeUser,
          reservation.closureReason,
          reservation.reservationStatuses,
          reservation.request_date,
          reservation.reservation_date,
          reservation.close_date
        );
      });
  }

  static async getReservation(id: number) {

      const reservation = await db.reservation.findUnique({
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
      return new Reservation(
        reservation.id,
        reservation.book,
        reservation.reservationMadeForUser,
        reservation.reservationMadeByUser,
        reservation.closeUser,
        reservation.closureReason,
        reservation.reservationStatuses,
        reservation.request_date,
        reservation.reservation_date,
        reservation.close_date
      );
  }

  static async createReservation(
    bookId: number,
    reservationMadeForUserId: string,
    reservationMadeByUserId: string,
    closeUserId: string,
    closureReasonId: number,
    request_date: Date,
    reservation_date: Date,
    close_date: Date
  ) {
    try {
      const reservation = await db.reservation.create({
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

      return new Reservation(
        reservation.id,
        reservation.book,
        reservation.reservationMadeForUser,
        reservation.reservationMadeByUser,
        reservation.closeUser,
        reservation.closureReason,
        reservation.reservationStatuses,
        reservation.request_date,
        reservation.reservation_date,
        reservation.close_date
      );
    } catch (error) {
      throw new Error();
    }
  }

  async updateReservation() {
    try {
      // Check if the reservation exists
      const existingReservation = await db.reservation.findUnique({
        where: {
          id: this.id,
        },
      });

      if (!existingReservation) {
        throw new Error(`Reservation with ID ${this.id} not found.`);
      }

      // Update the reservation
      const updatedReservation = await db.reservation.update({
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

      return new Reservation(
        updatedReservation.id,
        updatedReservation.book,
        updatedReservation.reservationMadeForUser,
        updatedReservation.reservationMadeByUser,
        updatedReservation.closeUser,
        updatedReservation.closureReason,
        updatedReservation.reservationStatuses,
        updatedReservation.request_date,
        updatedReservation.reservation_date,
        updatedReservation.close_date
      );
    } catch (error) {
      throw new Error();
    }
  }

  async deleteReservation() {
    try {
      // Check if the reservation exists
      const existingReservation = await db.reservation.findUnique({
        where: {
          id: this.id,
        },
      });

      if (!existingReservation) {
        throw new Error(`Reservation with ID ${this.id} not found.`);
      }

      // Delete the reservation
      await db.reservation.delete({
        where: {
          id: this.id,
        },
      });
    } catch (error) {
      throw new Error();
    }
  }

  static async searchReservations(bookId: number | undefined, userId: string | undefined) {
    try {
      const reservations = await db.reservation.findMany({
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
        return new Reservation(
          reservation.id,
          reservation.book,
          reservation.reservationMadeForUser,
          reservation.reservationMadeByUser,
          reservation.closeUser,
          reservation.closureReason,
          reservation.reservationStatuses,
          reservation.request_date,
          reservation.reservation_date,
          reservation.close_date
        );
      });
    } catch (error) {
      throw new Error();
    }
  }
}

export default Reservation;
