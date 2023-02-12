import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserBookings, postBooking, updateBooking } from "@/controllers";
import { bookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getUserBookings)
  .use(validateBody(bookingSchema))
  .post("/", postBooking)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
