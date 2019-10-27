import supertest from "supertest";
import faker from "faker";
import app from "../../server";
import http from "http";
let server;
let request;

describe("category class test integration", () => {
  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  it(`should return status 200 when ingressing url add and send only name`, async () => {
    const response = await request.post("/api/categorias/add").send({nombre:"laptops"});
    expect(response.status).toBe(200);
  });

  it(`should return status 200 when ingressing url add and send  name and description`, async () => {
    const response = await request.post("/api/categorias/add").send({nombre:"laptops portatiles",descripcion:"portatiles"});
    expect(response.status).toBe(200);
  });

  it(`should return status 500 when repeat name`, async () => {
    const response = await request.post("/api/categorias/add").send({nombre:"laptops"});
    expect(response.status).toBe(500);
  });

  it(`should return status 500 when ingressing url add`, async () => {
    const response = await request.post("/api/categorias/add");
    expect(response.status).toBe(500);
  });

  it('should the value is correct',async () => {
    const response = await request.get("/api/categorias/list");
    const response2 = await request.get(`/api/categorias/query?_id=${response.body.message[0]._id}`);
    expect(response2.body.message).toHaveProperty('_id',response.body.message[0]._id);
  });

  it('should the value is correct',async () => {
    const response = await request.get("/api/categorias/list");
    const response2 = await request.get(`/api/categorias/query?_id=${response.body.message[0]._id}`);
    const response3 = await request.put('/apit/categorias/update').send({
      
    });
    expect(response2.body.message).toHaveProperty('_id', response.body.message[0]._id);
  });


  it('should ingressing value for send and return 404 ',async () => {
    const response = await request.get("/api/categorias/list");
    const response2 = await request.get(`/api/categorias/query`).send({_id:response.body.message[0]._id});
    expect(response2.status).toBe(404);
  });

  // it(`should insert ten categories in category model and return status 200`, async () => {
  //   for (let index = 0; index < 10; index++) {
  //     const response = await request.post("/api/categorias/add").send({
  //       nombre: faker.lorem.word(),
  //       descripcion: faker.lorem.words()
  //     });
  //     expect(response.status).toBe(200);
  //   }
  // });

  it(`should remove all collection documents and return status 200`, async () => {
    const response = await request.get("/api/categorias/list");
    const array = response.body.message;
    for (let index = 0; index < array.length; index++) {
      const response2 = await request
        .delete("/api/categorias/remove")
        .send({ _id: array[index]._id });
      expect(response2.status).toBe(200);
    }
    expect(response.status).toBe(200);
  });

  afterAll(done => {
    server.close(done);
  });
  
});
