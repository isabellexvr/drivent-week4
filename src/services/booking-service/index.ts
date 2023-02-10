import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";
import { notFoundError, noVacancyError, outOtBusinessRulesError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { Booking } from "@prisma/client";
import dayjs from "dayjs";

async function checkTicket(userId: number) {
  //buscar enrollment
  //buscar ticket com o enrollment
  //checar se o ticker é presencial, tem hospedagem e está pago
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status === "RESERVED") {
    throw outOtBusinessRulesError();
  }
}

async function getUserBookings(userId: number): Promise<Booking> {
  const bookings = await bookingRepository.getBookingsByUserId(userId);
  if(!bookings) {
    throw notFoundError();
  }
  return bookings;
}

async function checkRoom(userId: number, roomId: number): Promise<void> {
  const roomBookings = await bookingRepository.getBookingsByRoomId(roomId);
  const room = await hotelRepository.findRoomByRoomId(roomId);
  if( !room) throw notFoundError();
  if(room.capacity <= roomBookings.length) throw noVacancyError();
}

async function postUserBooking(userId: number, roomId: number): Promise<number> {
  checkRoom(userId, roomId);
  const data = { userId, roomId, updatedAt: dayjs().toDate() };
  const postedBooking = await bookingRepository.postOrUpdateUserBooking(data);
  return postedBooking.id;
}

const bookingService = {
  checkTicket,
  getUserBookings,
  postUserBooking
};

export default bookingService;
