import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

import { Reservation, User, Book, CancellationReason, ReservationStatus } from "@prisma/client";

class BookReservation {
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
    try {
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
        return new BookReservation(
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
    } catch (error: any) {
      throw new Error(`Error fetching reservations: ${error.message}`);
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

      return new BookReservation(
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
    } catch (error: any) {
      throw new Error(`Error updating reservation: ${error.message}`);
    }
  }
  static async getReservation(id: number) {
    try {
      // Attempt to fetch the reservation with the provided ID
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
      return new BookReservation(
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
    } catch (error: any) {
      // If an error occurs during the process, throw an error with a message
      throw new Error(`Error fetching reservation: ${error.message}`);
    }
  }

  static async createReservation(
    bookId: number,
    reservationMadeForUserId: string | undefined,
    reservationMadeByUserId: string | undefined,
    closeUserId: string | undefined,
    closureReasonId: number | undefined,
    request_date: Date,
    reservation_date: Date,
    close_date: Date | undefined
  ) {
    try {
      // Create the reservation without including relations
      const data: any = {
        book: {
          connect: { id: bookId }
        },
        closeUserId,
        closureReasonId,
        request_date,
        reservation_date,
        close_date,
      };
  
      // Add reservationMadeForUserId if it's defined
      if (reservationMadeForUserId !== undefined) {
        data['reservationMadeForUser'] = {
          connect: { id: reservationMadeForUserId }
        };
      }
  
      // Add reservationMadeByUserId if it's defined
      if (reservationMadeByUserId !== undefined) {
        data['reservationMadeByUser'] = {
          connect: { id: reservationMadeByUserId }
        };
      }
  
      // Add closeUserId if it's defined
      if (closeUserId !== undefined) {
        data['closeUser'] = {
          connect: { id: '19b93f184-77b6-401e-a2b5-8841a23b669f' } // Replace '1' with the actual ID you want to connect to
        };
      }
      
  
      const reservation = await db.reservation.create({
        data,
      });
  
      // Fetch the associated relations
      const withRelations = await db.reservation.findUnique({
        where: { id: reservation.id },
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
          reservationStatuses: true,
        },
      });
  
      // Check if withRelations is null
      if (!withRelations) {
        throw new Error(`Reservation with ID ${reservation.id} not found.`);
      }
  
      return new BookReservation(
        withRelations.id,
        withRelations.book,
        withRelations.reservationMadeForUser,
        withRelations.reservationMadeByUser,
        withRelations.closeUser,
        withRelations.closureReason,
        withRelations.reservationStatuses,
        withRelations.request_date,
        withRelations.reservation_date,
        withRelations.close_date
      );
    } catch (error: any) {
      throw new Error(`Error creating reservation: ${error.message}`);
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
    } catch (error: any) {
      throw new Error(`Error deleting reservation: ${error.message}`);
    }
  }

  static async searchReservations(bookId: number | undefined, userId: string | undefined) {
    try {
      const whereClause: { bookId?: number; reservationMadeForUserId?: string } = {};

      if (bookId !== undefined) {
        whereClause.bookId = bookId;
      }

      if (userId !== undefined) {
        whereClause.reservationMadeForUserId = userId;
      }

      const reservations = await db.reservation.findMany({
        where: whereClause,
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
        return new BookReservation(
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
    } catch (error: any) {
      throw new Error(`Error searching reservations: ${error.message}`);
    }
  }
}

export default BookReservation;
