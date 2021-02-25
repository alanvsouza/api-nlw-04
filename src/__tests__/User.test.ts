import request from 'supertest';
import createConnection from '../database';
import { app } from '../app';
import { Connection, OneToMany } from 'typeorm';

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create user", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "user@example.com",
        name: "User example",
      });

    expect(response.status).toBe(201);
  });

  it("Shouldn't be able to create a user with an existing email", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "user@example.com",
        name: "User example",
      });

    expect(response.status).toBe(400);
  });

  it("Should be able to delete user", async () => {
    const email = "user@example.com";
    const { body: { message }, status } = await request(app).delete(`/users/${email}`);

    expect(message).toBe("User successfully deleted!");
    expect(status).toBe(200);
  });

});