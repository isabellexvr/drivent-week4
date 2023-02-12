import Joi from "joi";

export const bookingSchema = Joi.object({
  roomId: Joi.number().required()
});

export const updateBookingSchema = Joi.object({
  bookingId: Joi.string().required()
});
