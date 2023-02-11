import supertest from "supertest";
import httpStatus from "http-status";
import faker from "@faker-js/faker";
import * as jwt from "jsonwebtoken";
import { createUser, createFakeBooking, createHotel, createRoomWithHotelId } from "../factories";
import app, { init } from "@/app";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});
  
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /booking", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/booking");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("should respond with status 404 if user doesn't own any bookings", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 and with valid list of user's bookings", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      await createFakeBooking(user.id, room.id);

      const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        {
          id: expect.any(Number),
          userId: expect.any(Number),
          roomId: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      );
    });
  });
});
