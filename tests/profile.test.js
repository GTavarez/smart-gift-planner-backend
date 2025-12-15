import request from "supertest";
import app from "../app.js";

let token;

beforeEach(async () => {
  await request(app).post("/signup").send({
    name: "Tester",
    email: "tester@example.com",
    password: "password123",
    confirmPassword: "password123"
  });

  const res = await request(app).post("/signin").send({
    email: "tester@example.com",
    password: "password123"
  });

  token = res.body.token;
});

describe("PROFILE ROUTES", () => {
  it("GET /profile returns user info", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("tester@example.com");
  });

  it("PATCH /profile/budget updates budget", async () => {
    const res = await request(app)
      .patch("/profile/budget")
      .set("Authorization", `Bearer ${token}`)
      .send({ budget: 999 });

    expect(res.statusCode).toBe(200);
    expect(res.body.budget).toBe(999);
  });

  it("POST /gifts adds a gift", async () => {
    const gift = {
      name: "Watch",
      price: 199,
      link: "https://example.com/watch",
      description: "Gift watch"
    };

    const res = await request(app)
      .post("/gifts")
      .set("Authorization", `Bearer ${token}`)
      .send(gift);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Watch");
  });

  it("PATCH /gifts/:index/status updates gift status", async () => {
    // Create gift first
    await request(app)
      .post("/gifts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Watch",
        price: 199,
        link: "x",
        description: "y"
      });

    const res = await request(app)
      .patch("/gifts/0/status")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "purchased" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("purchased");
  });
});
