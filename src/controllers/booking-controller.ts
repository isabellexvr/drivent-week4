import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";

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
  //precisa ter o ticket presencial, com hospedagem e pago
  try{

   } catch(error){
    if(error.name === "OutOfBusinessRulesError") {
      return res.status(403).send( error.message );
    }
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