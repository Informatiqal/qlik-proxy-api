import { QlikProxyApi } from "../main";
import { generateUUID } from "./Session";

import { IvpDeleteSession, ISession, ITicket } from "../Interfaces";

export class VirtualProxy {
  constructor() {}

  public async virtualProxySessionRemove(
    this: QlikProxyApi,
    virtualProxy: string,
    sessionId: string
  ): Promise<IvpDeleteSession> {
    return await this.proxyClient
      .Delete(`${virtualProxy}/session/${sessionId}`)
      .then((res) => res.data as IvpDeleteSession);
  }

  public async virtualProxySessionRemoveForUser(
    this: QlikProxyApi,
    virtualProxy: string,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Delete(`${virtualProxy}/user/${userDir}/${userId}`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionGetAll(
    this: QlikProxyApi,
    virtualProxy: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Get(`${virtualProxy}/session`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionGet(
    this: QlikProxyApi,
    virtualProxy: string,
    sessionId: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Get(`${virtualProxy}/session/${sessionId}`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionGetForUser(
    this: QlikProxyApi,
    virtualProxy: string,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Get(`${virtualProxy}/user/${userDir}/${userId}`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionAdd(
    this: QlikProxyApi,
    virtualProxy: string,
    userId: string,
    userDir: string
  ): Promise<ISession> {
    return await this.proxyClient
      .Post(`${virtualProxy}/session`, {
        userId: userId,
        userDirectory: userDir,
        sessionId: generateUUID(),
      })
      .then((res) => res.data as ISession);
  }

  public async virtualProxyTicketAdd(
    this: QlikProxyApi,
    virtualProxy: string,
    userId: string,
    userDir: string,
    ticket?: string
  ): Promise<ITicket> {
    let data = {
      userId,
      userDirectory: userDir,
      ticket: ticket || "",
    };

    if (!ticket) delete data.ticket;

    return await this.proxyClient
      .Post(`${virtualProxy}/ticket`, data)
      .then((res) => res.data as ITicket);
  }
}
