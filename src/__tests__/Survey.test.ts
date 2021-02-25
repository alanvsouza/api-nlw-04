import request from 'supertest';
import createConnection from '../database';
import { app } from '../app';
import { Connection, OneToMany } from 'typeorm';

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a survey", async () => {
    const { status, body } = await request(app).post("/surveys")
      .send({
        title: "Example title",
        description: "Example title's description",
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys")
      .send({
        title: "Example title",
        description: "Example title's description",
      });

    const { body } = await request(app).get("/surveys");

    expect(body.length).toBe(2);
  });
});