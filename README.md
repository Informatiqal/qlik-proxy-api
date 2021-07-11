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
let proxyApi = new QlikProxyApi({
  host: "my-qs-host",
  port: 4243, // optional. default is 4243
  httpsAgent: httpsAgentCert,
  authentication: {
    user_dir: "SOME_USER_DIR",
    user_name: "SOME_USER_ID",
  },
});

// at this point we can use proxyApi to call any method
let aliveResponse = await proxyApi.alive();

let ticketResponse = await proxyApi.ticketAdd({
  userId: "SOME_USER_ID",
  userDir: "SOME_USER_DIR",
});
console.log(ticketResponse.ticket); // id of the generated ticket

let vpSessions = await proxyApi.virtualProxySessionGetAll("some-vp");
console.log(vpSessions); // array or all active sessions for specified virtual proxy
```

# Endpoints and methods

| Area           | HTTP Method | Endpoint                              | Method                             |
| -------------- | ----------- | ------------------------------------- | ---------------------------------- |
| About          | `GET`       | `/about/default`                      | `aboutDefault`                     |
| About          | `GET`       | `/about/description`                  | `aboutDescription`                 |
| About          | `GET`       | `/about/enums`                        | `aboutEnums`                       |
| About          | `GET`       | `/about/openapi`                      | `aboutOpenApi`                     |
| About          | `GET`       | `/about/openapi/{interfacename}`      | `aboutOpenApiInterface`            |
| About          | `GET`       | `/about/relations`                    | `aboutRelations`                   |
| Alive          | `GET`       | `/alive`                              | `alive`                            |
| Error          | `POST`      | `/error`                              | `error`                            |
| Health         | `GET`       | `/health`                             | `health`                           |
| Notified       | `POST`      | `/notified`                           | `notified`                         |
| Session        | `GET`       | `/session`                            | `sessionGetAll`                    |
| Session        | `POST`      | `/session`                            | `sessionAdd`                       |
| Session        | `DELETE`    | `/session/{id}`                       | `sessionRemove`                    |
| Session        | `GET`       | `/session/{id}`                       | `sessionGet`                       |
| Session        | `-`         | `-`                                   | `sessionGetAllForUserDir`          |
| Session        | `-`         | `-`                                   | `sessionGetAllForUserId`           |
| Ticket         | `POST`      | `/ticket`                             | `ticketAdd`                        |
| User           | `GET`       | `/user/{directory}/{id}`              | `userGet`                          |
| User           | `DELETE`    | `/user/{directory}/{id}`              | `userRemove`                       |
| {virtualproxy} | `GET`       | `/virtualproxy/session/{id}`          | `virtualProxySessionGet`           |
| {virtualproxy} | `DELETE`    | `/virtualproxy/session/{id}`          | `virtualProxySessionRemove`        |
| {virtualproxy} | `GET`       | `/virtualproxy/session`               | `virtualProxySessionGetAll`        |
| {virtualproxy} | `POST`      | `/virtualproxy/session`               | `virtualProxySessionAdd`           |
| {virtualproxy} | `GET`       | `/virtualproxy/user/{directory}/{id}` | `virtualProxySessionGetForUser`    |
| {virtualproxy} | `DELETE`    | `/virtualproxy/user/{directory}/{id}` | `virtualProxySessionRemoveForUser` |
| {virtualproxy} | `POST`      | `/virtualproxy/ticket`                | `virtualProxyTicketAdd`            |
