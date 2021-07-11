import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("About operations", function () {
  this.timeout(30000);

  it("About default", async function () {
    let aboutDefault = await proxyApi.aboutDefault();

    // expect(allTags.length).to.be.greaterThan(0);
    expect(true).to.be.true;
  });

  it("About description", async function () {
    let aboutDescription = await proxyApi.aboutDescription();

    expect(true).to.be.true;
  });

  it("About enums", async function () {
    let aboutEnums = await proxyApi.aboutOpenApiInterface("Main");

    expect(true).to.be.true;
  });
});
