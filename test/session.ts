import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("Session operations", function () {
  this.timeout(30000);

  it("Get all sessions", async function () {
    let sessions = await proxyApi.sessionGetAll();

    expect(sessions.length).to.be.greaterThan(0);
  });

  it("Get session details", async function () {
    let session = await proxyApi.sessionGet(
      "9efbd017-0415-4239-9d13-77b4b308fcb2"
    );

    expect(200).to.be.equal(200);
  });

  it("Remove session", async function () {
    let session = await proxyApi.sessionRemove(
      "03cb5928-701a-4251-a80b-930173fe6837"
    );

    expect(200).to.be.equal(200);
  });

  it("Add session", async function () {
    let session = await proxyApi.sessionAdd(
      process.env.TEST_USER_ID,
      process.env.TEST_USER_DIR
    );

    expect(200).to.be.equal(200);
  });

  it("Add ticket", async function () {
    let ticket = await proxyApi.ticketAdd(
      process.env.TEST_USER_ID,
      process.env.TEST_USER_DIR
    );

    expect(200).to.be.equal(200);
  });
});
