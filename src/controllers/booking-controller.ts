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
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  console.log("passou essa porra wtff")
  try {
    const postedBookingId = await bookingService.postUserBooking(userId, roomId);
    return res.status(httpStatus.CREATED).send({ postedBookingId });
  } catch (error) {
    if (error.name === "OutOfBusinessRulesError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    if (error.name === "NoVacancyError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  //o user deve possuir uma reserva
  //o quarto para o qual o user quer mudar deve ter capacidade livre
  try {
    const updatedBookingId = await bookingService.updateUserBooking( userId, roomId, Number(bookingId));
    return res.status(httpStatus.OK).send({ updatedBookingId });
  }catch(error) {
    if (error.name === "OutOfBusinessRulesError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    if (error.name === "NoVacancyError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
  }
}
