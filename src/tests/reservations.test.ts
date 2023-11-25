import { Request, Response } from 'express';
import reservationController from '../controllers/reservation-controllers/reservationController';

const mockRequest: Partial<Request> = {};
const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  redirect: jest.fn(),
};

describe('createReservation', () => {
  it('should create a reservation successfully', async () => {

    mockRequest.body = {
      bookId: 1,
      reservationMadeForUserId: '1',
      reservationMadeByUserId: '1',
      closureReasonId: '1',
      request_date: '2023-11-20T10:00:00Z',
      reservation_date: '2023-11-21T10:00:00Z',
      close_date: '2023-11-22T10:00:00Z',
      closeUserId: '1',
      _csrf: 'mock_csrf_token', 
    };

    await reservationController.createReservation(mockRequest as Request, mockResponse as Response);


    expect(mockResponse.redirect).toHaveBeenCalledWith('/reservations');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
