import { QlikProxyClient } from "qlik-rest-api";
import { generateUUID } from "../utils";
import { Session, IClassSession } from "./Session";

export interface ISession {
  /**
   * @type string
   */
  UserDirectory: string;
  /**
   * @type string
   */
  UserId: string;
  /**
   * User specific attributes
   * @optional
   * @example [  { "<Attribute1>": "value1a" },
        { "<Attribute1>": "value1b" }, [attributes are not unique]
        { "<Attribute2>": "" }, [value can be empty]
        { "<Attribute3>": "value3" },
        ...]
   */
  Attributes: { [k: string]: string }[];
  /**
   * @type string
   */
  SessionId: string;
  /**
   * @type bool
   * @optional
   */
  NewUser?: boolean;
}

export interface ISessionGet {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   * @optional
   */
  virtualProxy?: string;
}

export interface ISessionGetAll {
  /**
   * @type string
   * @optional
   */
  virtualProxy?: string;
}

export interface ISessionsForUser {
  /**
   * @type string
   */
  userId: string;
  /**
   * @type string
   */
  userDirectory: string;
  /**
   * @type string
   * @optional
   */
  virtualProxy?: string;
}

export interface ISessionsAdd extends ISessionsForUser {}

export interface IClassSessions {
  /**
   * Get sessions details
   * @param Promise {@link ISessionGet}
   */
  get(arg: ISessionGet): Promise<IClassSession>;
  /**
   * Get all sessions
   * @param Promise {@link ISessionGetAll}
   */
  getAll(arg: ISessionGetAll): Promise<IClassSession[]>;
  /**
   * Get all sessions for specific user
   * @param Promise {@link ISessionsForUser}
   */
  getForUser(arg: ISessionsForUser): Promise<IClassSession[]>;
  /**
   * Create session for user
   * @param Promise {@link ISessionsAdd}
   */
  add(arg: ISessionsAdd): Promise<IClassSession>;
}

export class Sessions implements IClassSessions {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async get(arg: ISessionGet) {
    if (!arg.id)
      throw new Error(`sessions.get: "sessionId" parameter is required`);

    const session: Session = new Session(
      this.proxyClient,
      arg.id,
      null,
      arg.virtualProxy
    );
    await session.init();

    return session;
  }

  public async getAll(arg: ISessionGetAll) {
    let url = "session";
    if (arg.virtualProxy) url = `${arg.virtualProxy}/session`;
    return await this.proxyClient
      .Get(url)
      .then((res) => res.data as ISession[])
      .then((data) => {
        return data.map(
          (t) => new Session(this.proxyClient, t.SessionId, t, arg.virtualProxy)
        );
      });
  }

  public async getForUser(arg: ISessionsForUser) {
    if (!arg.userId)
      throw new Error(`sessions.getForUser: "userId" parameter is required`);
    if (!arg.userDirectory)
      throw new Error(
        `sessions.getForUser: "userDirectory" parameter is required`
      );

    let url = `user/${encodeURI(arg.userDirectory)}/${encodeURI(arg.userId)}`;
    if (arg.virtualProxy)
      url = `${arg.virtualProxy}/user/${encodeURI(
        arg.userDirectory
      )}/${encodeURI(arg.userId)}`;

    return await this.proxyClient
      .Get(url)
      .then((res) => res.data as ISession[])
      .then((s) =>
        s.map(
          (t) => new Session(this.proxyClient, t.SessionId, t, arg.virtualProxy)
        )
      );
  }

  public async add(arg: ISessionsAdd) {
    if (!arg.userId)
      throw new Error(`sessions.add: "userId" parameter is required`);
    if (!arg.userDirectory)
      throw new Error(`sessions.add: "userDir" parameter is required`);

    let url = `session`;
    if (arg.virtualProxy) url = `${arg.virtualProxy}/session`;

    return await this.proxyClient
      .Post(url, {
        userId: arg.userId,
        userDirectory: arg.userDirectory,
        sessionId: generateUUID(),
      })
      .then((res) => res.data as ISession)
      .then(
        (s) => new Session(this.proxyClient, s.SessionId, s, arg.virtualProxy)
      );
  }
}
