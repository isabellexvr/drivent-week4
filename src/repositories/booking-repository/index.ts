import { prisma } from "@/config";

async function getUserBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId }
  });
}

async function postOrUpdateUserBooking(userId: number) {
  return
}

const bookingRepository = {
  getUserBooking
};

export default bookingRepository;
