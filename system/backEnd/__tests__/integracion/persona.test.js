import supertest from "supertest";
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

  // it('should ', async () => {
  //   const response = await request.post("api/usuarios/login").send({
  //     email: "bogarin@gmail.com",
  //     password:"ramon"
  //   })
  // });

  it("should ", async () => {
    const res = await request
      .post("/api/usuarios/login")
      .send({
        email: "bogarin@gmail.com",
        password:"ramon"
      })
      .set("Content-type", "application/x-www-form-urlencoded");
    console.log(res.tokenReturn);
    console.log(res.body.message);


  });

  afterAll(done => {
    server.close(done);
  });
});
