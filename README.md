# Qlik Sense PROXY API (QSEoW)

Node.js package to interact with Qlik Sense PROXY API endpoints.

# Installation

`npm install qlik-proxy-api`

# Usage

Using certificates as authentication method

```javascript
import fs from "fs";
import https from "https";
import { QlikProxyApi } from "qlik-proxy-api";

const httpsAgentCert = new https.Agent({
  rejectUnauthorized: false, // if we want suppress certificate errors (like self-signed certificate error)
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

// at this point we can use proxyApi to call any method
const aliveResponse = await proxyApi.alive.get();

const ticketResponse = await proxyApi.tickets.add(
  "SOME_USER_ID",
  "SOME_USER_DIR",
  "virtual-proxy-prefix" // optional. default is the main/default virtual proxy
);
console.log(ticketResponse.ticket); // id of the generated ticket

const session = await proxyApi.sessions.add(
  "SOME_USER_ID",
  "SOME_USER_DIR",
  "virtual-proxy-prefix" // optional. default is the main/default virtual proxy
);

console.log(session.details.SessionId);
```

In "plain" `Node.js`

```javascript
const { QlikProxyApi } = require("qlik-proxy-api/dist/src/main");
```

# Endpoints and methods

Please check the
[documentation page](https://informatiqal.github.io/qlik-proxy-api/modules.html) for list of methods
