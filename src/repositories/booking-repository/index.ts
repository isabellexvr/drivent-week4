import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function getBookingsByUserId(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: { userId }
  });
}

async function getBookingsByRoomId(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: { roomId }
  });
}

type BookingUpsert = {
    id?: number,
    userId: number,
    roomId: number,
    updatedAt: Date
}

async function postOrUpdateUserBooking(params: BookingUpsert): Promise<Booking> {
  return prisma.booking.upsert({
    where: { id: params.id || 0 },
    create: params,
    update: params
  });
}

const bookingRepository = {
  getBookingsByUserId,
  getBookingsByRoomId,
  postOrUpdateUserBooking
};

export default bookingRepository;
