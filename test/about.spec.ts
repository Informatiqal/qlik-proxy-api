import chai from "chai";
import { Config } from "./Config";

const expect = chai.expect;
const config = new Config();
const proxyApi = config.proxyApi;

describe("About operations", function () {
  this.timeout(30000);

  it("About default", async function () {
    const aboutDefault = await proxyApi.about.default();

    expect(aboutDefault).to.be.an("object");
  });

  it("About description", async function () {
    const aboutDescription = await proxyApi.about.description();

    expect(aboutDescription.length).to.be.greaterThan(0);
  });

  it("About enums", async function () {
    const aboutEnums = await proxyApi.about.openApiInterface("Main");

    expect(aboutEnums).to.have.property("basePath");
  });
});
