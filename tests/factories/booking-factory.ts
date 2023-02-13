import { prisma } from "@/config";
import dayjs from "dayjs";

export async function createFakeBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      updatedAt: dayjs().toDate()
    }
  });
}

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      updatedAt: dayjs().toDate()
    }
  });
}
