import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserBookings, postOrUpdateBooking } from "@/controllers";
import { bookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/booking", getUserBookings)
  .post("/booking", validateBody(bookingSchema), postOrUpdateBooking);

export { bookingRouter };
