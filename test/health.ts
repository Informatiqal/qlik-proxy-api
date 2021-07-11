import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("Health", function () {
  this.timeout(30000);

  it("Health", async function () {
    let health = await proxyApi.health();

    expect(true).to.be.true;
  });
});
