import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";
import { notFoundError, noVacancyError, outOtBusinessRulesError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { Booking } from "@prisma/client";
import dayjs from "dayjs";

async function checkTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket) {
    throw notFoundError();}
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

async function checkRoom( roomId: number): Promise<void> {
  const roomBookings = await bookingRepository.getBookingsByRoomId(roomId);
  const room = await hotelRepository.findRoomByRoomId(roomId);
  if(!room) throw notFoundError();
  if(room.capacity <= roomBookings.length) throw noVacancyError();
}

async function postUserBooking(userId: number, roomId: number): Promise<number> {
  await checkTicket(userId);
  await checkRoom(roomId);
  const data = { userId, roomId, updatedAt: dayjs().toDate() };
  const postedBooking = await bookingRepository.postOrUpdateUserBooking(data);
  return postedBooking.id;
}

async function updateUserBooking(userId: number, roomId: number, bookingId: number) {
  await checkTicket(userId);
  await checkRoom(roomId);
  const bookings = await getUserBookings(userId);
  if(!bookings) throw notFoundError();
  if( bookings.id !== bookingId) throw outOtBusinessRulesError();
  //é possível mudar pro mesmo quarto ?????? qual o sentido disso ?
  //if( bookings.roomId === roomId) throw sameRoomError();
  const data = { id: bookingId, userId, roomId, updatedAt: dayjs().toDate() };
  const postedBooking = await bookingRepository.postOrUpdateUserBooking(data);
  return postedBooking.id;
}

const bookingService = {
  checkTicket,
  getUserBookings,
  postUserBooking,
  updateUserBooking
};

export default bookingService;
