import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("Alive", function () {
  this.timeout(30000);

  it("Alive", async function () {
    let alive = await proxyApi.alive.get();

    expect(alive).to.be.equal(true);
  });
});
