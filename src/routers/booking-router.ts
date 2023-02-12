import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { getUserBookings, postBooking, updateBooking } from "@/controllers";
import { bookingSchema, updateBookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getUserBookings)
  .use(validateBody(bookingSchema))
  .post("/", postBooking)
  .put("/:bookingId", validateParams(updateBookingSchema), updateBooking);

export { bookingRouter };
