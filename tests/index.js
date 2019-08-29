// * Depencies import * //
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server";
import { models, db } from "models";
import { seed } from "./seed";

// * Chai configuration * //
chai.use(chaiHttp);
chai.should();

describe("Server API routes with database interaction", () => {
  beforeEach(done => {
    db.sync({ force: true })
      .then(() => {
        return seed(models);
      })
      .then(() => {
        done();
      });
  });

  describe("Get / url", () => {
    it("Should get an object as answer", done => {
      chai
        .request(app)
        .get("/v1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("GET /api/users", done => {
    it("should get a list of users", done => {
      chai
        .request(app)
        .get("/v1/users")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          done();
        });
    });
  });

  describe("Get random url", () => {
    it("Should get an error object as answer", done => {
      chai
        .request(app)
        .get("/fezfez")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

describe("Server API routes without database interaction", () => {
  beforeEach(done => {
    db.sync({ force: true }).then(() => {
      done();
    });
  });

  describe("GET /v1/users", done => {
    it("should get an error when asket list of users", done => {
      chai
        .request(app)
        .get("/v1/users")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res).to.be.json;
          done();
        });
    });
  });
});
