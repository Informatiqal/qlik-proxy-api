import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("Sessions", function () {
  this.timeout(30000);
  it("Session operation", async function () {
    const session = await proxyApi.sessions.add(
      process.env.TEST_USER_ID,
      process.env.TEST_USER_DIR,
      "hdr"
    );

    const findSessions = await (
      await proxyApi.sessions.getAll("hdr")
    ).filter((s) => s.details.SessionId == session.details.SessionId);

    const removeResponse = await session.remove();

    expect(findSessions.length).to.be.equal(1) &&
      expect(session.details.UserId).to.be.equal(process.env.TEST_USER_ID) &&
      expect(removeResponse).to.be.equal(200);
  });

  it("Add ticket", async function () {
    const ticket = await proxyApi.tickets.add(
      process.env.TEST_USER_ID,
      process.env.TEST_USER_DIR,
      "hdr"
    );

    expect(ticket).to.have.property("Ticket") &&
      expect(ticket.UserId).to.be.equal(process.env.TEST_USER_ID);
  });
});
