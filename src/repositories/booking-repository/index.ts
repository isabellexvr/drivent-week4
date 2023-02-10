import { prisma } from "@/config";

async function getUserBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId }
  });
}

const bookingRepository = {
  getUserBooking
};

export default bookingRepository;
