import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserBookings, postBooking, updateBooking } from "@/controllers";
import { bookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getUserBookings)
  .post("/", validateBody(bookingSchema), postBooking)
  .put("/:bookingId", validateBody(bookingSchema), updateBooking);

export { bookingRouter };
