import { QlikProxyApi } from "../main";

import { ISession } from "../Interfaces";

export class Session {
  constructor() {}

  public async sessionGet(
    this: QlikProxyApi,
    sessionId: string
  ): Promise<ISession> {
    return await this.proxyClient
      .Get(`session/${sessionId}`)
      .then((res) => res.data as ISession);
  }

  public async sessionGetAll(this: QlikProxyApi): Promise<ISession[]> {
    return await this.proxyClient
      .Get(`session`)
      .then((res) => res.data as ISession[]);
  }

  public async sessionGetAllForUserId(
    this: QlikProxyApi,
    userId: string
  ): Promise<ISession[]> {
    return await this.sessionGetAll().then((allSessions) => {
      return allSessions.filter((s) => s.UserId == userId);
    });
  }

  public async sessionGetAllForUserDir(
    this: QlikProxyApi,
    userDir: string
  ): Promise<ISession[]> {
    return await this.sessionGetAll().then((allSessions) => {
      return allSessions.filter((s) => s.UserDirectory == userDir);
    });
  }

  public async sessionAdd(
    this: QlikProxyApi,
    userId: string,
    userDir: string
  ): Promise<ISession> {
    return await this.proxyClient
      .Post(`session`, {
        userId: userId,
        userDirectory: userDir,
        sessionId: generateUUID(),
      })
      .then((res) => res.data as ISession);
  }

  // public async sessionRemoveAllForUser(
  //   this: QlikProxyApi,
  //   userId: string
  // ): Promise<number> {
  //   return await this.proxyClient
  //     .Delete(`session/${sessionId}`)
  //     .then((res) => res.status);
  // }

  public async sessionRemove(
    this: QlikProxyApi,
    sessionId: string
  ): Promise<number> {
    return await this.proxyClient
      .Delete(`session/${sessionId}`)
      .then((res) => res.status);
  }
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
