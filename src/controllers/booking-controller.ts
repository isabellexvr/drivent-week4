import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";

export async function getUserBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const bookings = await bookingService.getUserBookings(userId);
    return res.status(200).send(bookings);
  }catch(error){

  }
}

export async function postOrUpdateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try{

   }catch(error){

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