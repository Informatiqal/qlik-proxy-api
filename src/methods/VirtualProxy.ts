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
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionRemove: "virtualProxy" parameter is required`
      );
    if (!sessionId)
      throw new Error(
        `virtualProxySessionRemove: "sessionId" parameter is required`
      );

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
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionRemoveForUser: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxySessionRemoveForUser: "userId" parameter is required`
      );
    if (!userDir)
      throw new Error(
        `virtualProxySessionRemoveForUser: "userDir" parameter is required`
      );

    return await this.proxyClient
      .Delete(`${virtualProxy}/user/${userDir}/${userId}`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionGetAll(
    this: QlikProxyApi,
    virtualProxy: string
  ): Promise<ISession[]> {
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionGetAll: "virtualProxy" parameter is required`
      );

    return await this.proxyClient
      .Get(`${virtualProxy}/session`)
      .then((res) => res.data as ISession[]);
  }

  public async virtualProxySessionGet(
    this: QlikProxyApi,
    virtualProxy: string,
    sessionId: string
  ): Promise<ISession[]> {
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionGet: "virtualProxy" parameter is required`
      );
    if (!sessionId)
      throw new Error(
        `virtualProxySessionGet: "sessionId" parameter is required`
      );

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
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionGetForUser: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxySessionGetForUser: "userId" parameter is required`
      );
    if (!userDir)
      throw new Error(
        `virtualProxySessionGetForUser: "userDir" parameter is required`
      );

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
    if (!virtualProxy)
      throw new Error(
        `virtualProxySessionAdd: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(`virtualProxySessionAdd: "userId" parameter is required`);
    if (!userDir)
      throw new Error(
        `virtualProxySessionAdd: "userDir" parameter is required`
      );

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
    if (!virtualProxy)
      throw new Error(
        `virtualProxyTicketAdd: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(`virtualProxyTicketAdd: "userId" parameter is required`);
    if (!userDir)
      throw new Error(`virtualProxyTicketAdd: "userDir" parameter is required`);

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
