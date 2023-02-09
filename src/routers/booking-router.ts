import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/booking", getAllBookings)
  .post("/booking", validateBody(),postOrUpdateBooking)

export { bookingRouter };
