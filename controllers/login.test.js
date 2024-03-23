import request from "supertest";
import app from "../app.js";

describe("login controller", () => {
  const signinData = {
    email: "andrii1@gmail.com",
    password: "123456",
  };

  test("status code 200", async () => {
    const { statusCode } = await request(app)
      .post("/api/users/login")
      .send(signinData);
    expect(statusCode).toBe(200);
  });

  test("have token", async () => {
    const { body } = await request(app)
      .post("/api/users/login")
      .send(signinData);
    expect(body).toHaveProperty("token");
  });

  test("have object user with the keys email and subscription", async () => {
    const { body } = await request(app)
      .post("/api/users/login")
      .send(signinData);
    expect(body).toHaveProperty("user");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
