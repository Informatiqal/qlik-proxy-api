import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("Health", function () {
  this.timeout(30000);

  it("Health", async function () {
    const health = await proxyApi.health.get();

    expect(health).to.be.equal(200);
  });
});
