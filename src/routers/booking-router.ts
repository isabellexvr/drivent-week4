import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserBookings, postBooking, updateBooking } from "@/controllers";
import { bookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/booking", getUserBookings)
  .post("/booking", validateBody(bookingSchema), postBooking)
  .put("/booking/:bookingId", validateBody(bookingSchema), updateBooking);

export { bookingRouter };
