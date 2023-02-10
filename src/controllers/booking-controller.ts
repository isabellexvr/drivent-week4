import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getUserBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const bookings = await bookingService.getUserBookings(userId);
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  //se o quarto não existe, retornar 404
  //se o quarto não tem mais vagas, retornar 403
  //se o ticket for remoto, sem hospedagem ou não estiver pago, retornar 403
  //
  try {
    const booking = await bookingService.postUserBooking(userId, roomId);
  } catch (error) {
    if (error.name === "OutOfBusinessRulesError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    if (error.name === "NoVacancyError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  try {

  }catch(error) {

  }
}

/* model Booking {
    id        Int      @id @default(autoincrement())
    User      User     @relation(fields: [userId], references: [id])
    userId    Int
    Room      Room     @relation(fields: [roomId], references: [id])
    roomId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  } */