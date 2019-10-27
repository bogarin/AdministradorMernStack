import supertest from "supertest";
import faker from "faker";
import app from "../../server";
import http from "http";
let server;
let request;

let categoria = {
  nombre: "Equipos de Computo",
  descripcion: "`Todos los equipos de Computo"
};

describe("article class test integration", () => {
  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  it("should insert data in categoria return status 200", async () => {
    const response = await request.post("/api/categorias/add").send({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    expect(response.status).toBe(200);
  });

  it("should return status 200 when ingressing url list", async () => {
    const response = await request.get("/api/articulos/list");
    expect(response.status).toBe(200);
  });

  it("should return status 200 when inserting data in url add", async () => {
    const responseResultFind = await request.get(
      `/api/categorias/list?valor=${categoria.nombre}`
    );

    let id = responseResultFind.body.message[0]._id;

    const response = await request.post("/api/articulos/add").send({
      categoria: id,
      codigo: faker.address.zipCode(),
      nombre: faker.commerce.productName(),
      descripcion: faker.commerce.product(),
      precio_venta: faker.commerce.price(),
      stock: 5
    });
    expect(response.status).toBe(200);
  });
 
  it("should return status 200 when inserting static data in url add", async () => {
    const responseResultFind = await request.get(
      `/api/categorias/list?valor=${categoria.nombre}`
    );
    let id = responseResultFind.body.message[0]._id;
    const response = await request.post("/api/articulos/add").send({
      categoria: id,
      codigo: faker.address.zipCode(),
      nombre: "pc",
      descripcion: faker.commerce.product(),
      precio_venta: faker.commerce.price(),
      stock: 5
    });
    expect(response.status).toBe(200);
  });

  it("should return status 500 when inserting  dulpicate name in url add", async () => {
    const responseResultFind = await request.get(
      `/api/categorias/list?valor=${categoria.nombre}`
    );
    let id = responseResultFind.body.message[0]._id;
    const response = await request.post("/api/articulos/add").send({
      categoria: id,
      codigo: faker.address.zipCode(),
      nombre: "pc",
      descripcion: faker.commerce.product(),
      precio_venta: faker.commerce.price(),
      stock: 5
    });
    expect(response.status).toBe(500);
  });

  it(' should ', async () => {
    const responseResultFind = await request.get(`/api/articulos/list?valor=p`);  
    expect(responseResultFind.body.message[0].nombre).toBe("pc");
  });
  
  it("should reutrn status 200 when remove all data ", async () => {
    const responseListDelete = await request.get("/api/articulos/list");
    const documentArray = responseListDelete.body.message;
    for (let index = 0; index < documentArray.length; index++) {
      const idDocument = documentArray[index]._id;
      const responseDelete = await request
        .delete("/api/articulos/remove")
        .send({ _id: idDocument });
      expect(responseDelete.status).toBe(200);
    }
  });

  it("should  delete data in categoria and return status 200", async () => {
    const responseResultFind = await request.get(
      `/api/categorias/list?valor=${categoria.nombre}`
    );

    let id = responseResultFind.body.message[0]._id;

    const responseRemove = await request
      .delete("/api/categorias/remove")
      .send({ _id: id });
    expect(responseRemove.status).toBe(200);
  });

  afterAll(done => {
    server.close(done);
  });
});
