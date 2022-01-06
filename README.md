![](https://badges.aleen42.com/src/mocha.svg) ![](./test/badge.png) [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T0148ZP)

# Qlik Sense Proxy API

Node.js package to interact with Qlik Sense Proxy API (QSEoW)

---

## Please check out the [Wiki section](https://github.com/Informatiqal/qlik-proxy-api/wiki) for details and examples

---

## Installation

`npm install --save qlik-proxy-api`

## Usage

(Using certificates as authentication method)

```javascript
import fs from "fs";
import https from "https";
import { QlikProxyApi } from "qlik-proxy-api";

// setup the httpsAgent
//   - read the certificates
//   - ignore certificate errors
const httpsAgentCert = new https.Agent({
  rejectUnauthorized: false,
  cert: fs.readFileSync(`path/to/client.pem`),
  key: fs.readFileSync(`path/to/client_key.pem`),
});

// create new instance or qlik-proxy-api
const proxyApi = new QlikProxyApi.client({
  host: "my-qs-host",
  port: 4243, // optional. default is 4243
  httpsAgent: httpsAgentCert,
  authentication: {
    user_dir: "SOME_USER_DIR",
    user_name: "SOME_USER_ID",
  },
});

// create new session for "USER_DIR\USER_ID" in the default virtual proxy
const session = await proxyApi.sessions.add("USER_ID", "USER_DIR");

console.log(session.details.SessionId);
```

## Methods

Developer documentation for all methods can be found [here](https://informatiqal.github.io/qlik-proxy-api/modules.html) for list of methods

---

## **NOT AFFILIATED WITH QLIK**
