import { QlikProxyClient } from "qlik-rest-api";
import { generateUUID } from "../utils";
import { Session, IClassSession } from "./Session";

export interface ISession {
  UserDirectory: string;
  UserId: string;
  Attributes: string[];
  SessionId: string;
  NewUser?: boolean;
}

export interface IClassSessions {
  get(id: string, virtualProxy?: string): Promise<IClassSession>;
  getAll(virtualProxy?: string): Promise<IClassSession[]>;
  getForUser(
    userId: string,
    userDirectory: string,
    virtualProxy?: string
  ): Promise<IClassSession[]>;
  add(
    userId: string,
    userDirectory: string,
    virtualProxy?: string
  ): Promise<IClassSession>;
}

export class Sessions implements IClassSessions {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async get(id: string, virtualProxy?: string) {
    if (!id) throw new Error(`sessions.get: "sessionId" parameter is required`);

    const session: Session = new Session(
      this.proxyClient,
      id,
      null,
      virtualProxy
    );
    await session.init();

    return session;
  }

  public async getAll(virtualProxy?: string) {
    let url = "session";
    if (virtualProxy) url = `${virtualProxy}/session`;
    return await this.proxyClient
      .Get(url)
      .then((res) => res.data as ISession[])
      .then((data) => {
        return data.map(
          (t) => new Session(this.proxyClient, t.SessionId, t, virtualProxy)
        );
      });
  }

  public async getForUser(
    userId: string,
    userDirectory: string,
    virtualProxy?: string
  ) {
    if (!userId)
      throw new Error(`sessions.getForUser: "userId" parameter is required`);
    if (!userDirectory)
      throw new Error(
        `sessions.getForUser: "userDirectory" parameter is required`
      );

    let url = `user/${encodeURI(userDirectory)}/${encodeURI(userId)}`;
    if (virtualProxy)
      url = `${virtualProxy}/user/${encodeURI(userDirectory)}/${encodeURI(
        userId
      )}`;

    return await this.proxyClient
      .Get(url)
      .then((res) => res.data as ISession[])
      .then((s) =>
        s.map(
          (t) => new Session(this.proxyClient, t.SessionId, t, virtualProxy)
        )
      );
  }

  public async add(
    userId: string,
    userDirectory: string,
    virtualProxy?: string
  ) {
    if (!userId)
      throw new Error(`sessions.add: "userId" parameter is required`);
    if (!userDirectory)
      throw new Error(`sessions.add: "userDir" parameter is required`);

    let url = `session`;
    if (virtualProxy) url = `${virtualProxy}/session`;

    return await this.proxyClient
      .Post(url, {
        userId: userId,
        userDirectory: userDirectory,
        sessionId: generateUUID(),
      })
      .then((res) => res.data as ISession)
      .then((s) => new Session(this.proxyClient, s.SessionId, s, virtualProxy));
  }
}
