import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";
import dotenv from "dotenv";
import { findUser, deleteUsers } from "../services/authServices.js";
dotenv.config();

const { TEST_DB_HOST, PORT } = process.env;

describe("test/signup route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = await app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  afterEach(async () => {
    await deleteUsers({});
  });

  test("test /signup with correct data", async () => {
    const signupData = {
      email: "bogdan1234@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/register")
      .send(signupData);
    expect(statusCode).toBe(201);

    expect(body.user.email).toBe(signupData.email);

    const user = await findUser({ email: signupData.email });
  });
});
