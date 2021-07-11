import fs from "fs";
import path from "path";
import https from "https";

const dotEnvPath = path.resolve(".env");
require("dotenv").config({ path: dotEnvPath });

import { QlikProxyApi } from "../src/main";

export class Config {
  public proxyApi: QlikProxyApi;
  constructor() {
    const cert = fs.readFileSync(`${process.env.TEST_CERT}/client.pem`);
    const key = fs.readFileSync(`${process.env.TEST_CERT}/client_key.pem`);

    const httpsAgentCert = new https.Agent({
      rejectUnauthorized: false,
      cert: cert,
      key: key,
    });

    let proxyApi = new QlikProxyApi({
      host: process.env.TEST_HOST,
      port: 4243,
      httpsAgent: httpsAgentCert,
      authentication: {
        user_dir: process.env.TEST_USER_DIR,
        user_name: process.env.TEST_USER_ID,
      },
    });

    this.proxyApi = proxyApi;
  }
}
