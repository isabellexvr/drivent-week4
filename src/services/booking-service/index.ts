import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, outOtBusinessRulesError } from "@/errors";

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

async function getUserBookings(userId: number) {
  
  
}

const bookingService = {
  checkTicket,
  getUserBookings
};

export default bookingService;
