import request from "supertest";
import app from "../app.js";

describe("AUTH ROUTES", () => {

  it("should sign up a new user", async () => {
    const res = await request(app).post("/signup").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should sign in and return token", async () => {

    // Create the user in THIS test
    await request(app).post("/signup").send({
      name: "Test",
      email: "login@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    const res = await request(app).post("/signin").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    global.testToken = res.body.token;
  });

  it("should return user with /me", async () => {

    // Create user again for THIS test
    await request(app).post("/signup").send({
      name: "Test",
      email: "me@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    const login = await request(app).post("/signin").send({
      email: "me@example.com",
      password: "password123",
    });

    const res = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("me@example.com");
  });
});
