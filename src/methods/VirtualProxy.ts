import { generateUUID } from "../utils";

import { ISession } from "./Sessions";
import { ITicket } from "../methods/Ticket";
import { QlikRepositoryClient } from "qlik-rest-api";

export interface IvpDeleteSession extends ISession {
  lastSessionForUser?: boolean;
}

export interface IClassVirtualProxies {
  sessionRemove(
    virtualProxy: string,
    sessionId: string
  ): Promise<IvpDeleteSession>;
  sessionRemoveForUser(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ): Promise<ISession[]>;
  sessionGetAll(virtualProxy: string): Promise<ISession[]>;
  sessionGet(virtualProxy: string, sessionId: string): Promise<ISession[]>;
  sessionGetForUser(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ): Promise<ISession[]>;
  sessionAdd(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ): Promise<ISession>;
  ticketAdd(
    virtualProxy: string,
    userId: string,
    userDirectory: string,
    ticket?: string
  ): Promise<ITicket>;
}

export class VirtualProxies {
  private proxyClient: QlikRepositoryClient;
  constructor(proxyClient: QlikRepositoryClient) {
    this.proxyClient = proxyClient;
  }

  public async sessionRemove(virtualProxy: string, sessionId: string) {
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

  public async sessionRemoveForUser(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.sessionRemoveForUser: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxies.sessionRemoveForUser: "userId" parameter is required`
      );
    if (!userDirectory)
      throw new Error(
        `virtualProxies.sessionRemoveForUser: "userDirectory" parameter is required`
      );

    return await this.proxyClient
      .Delete(`${virtualProxy}/user/${userDirectory}/${userId}`)
      .then((res) => res.data as ISession[]);
  }

  public async sessionGetAll(virtualProxy: string) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.sessionGetAll: "virtualProxy" parameter is required`
      );

    return await this.proxyClient
      .Get(`${virtualProxy}/session`)
      .then((res) => res.data as ISession[]);
  }

  public async sessionGet(virtualProxy: string, sessionId: string) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.sessionGet: "virtualProxy" parameter is required`
      );
    if (!sessionId)
      throw new Error(
        `virtualProxies.sessionGet: "sessionId" parameter is required`
      );

    return await this.proxyClient
      .Get(`${virtualProxy}/session/${sessionId}`)
      .then((res) => res.data as ISession[]);
  }

  public async sessionGetForUser(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.sessionGetForUser: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxies.sessionGetForUser: "userId" parameter is required`
      );
    if (!userDirectory)
      throw new Error(
        `virtualProxies.sessionGetForUser: "userDirectory" parameter is required`
      );

    return await this.proxyClient
      .Get(`${virtualProxy}/user/${userDirectory}/${userId}`)
      .then((res) => res.data as ISession[]);
  }

  public async sessionAdd(
    virtualProxy: string,
    userId: string,
    userDirectory: string
  ) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.sessionAdd: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxies.sessionAdd: "userId" parameter is required`
      );
    if (!userDirectory)
      throw new Error(
        `virtualProxies.sessionAdd: "userDirectory" parameter is required`
      );

    return await this.proxyClient
      .Post(`${virtualProxy}/session`, {
        userId: userId,
        userDirectory: userDirectory,
        sessionId: generateUUID(),
      })
      .then((res) => res.data as ISession);
  }

  public async ticketAdd(
    virtualProxy: string,
    userId: string,
    userDirectory: string,
    ticket?: string
  ) {
    if (!virtualProxy)
      throw new Error(
        `virtualProxies.ticketAdd: "virtualProxy" parameter is required`
      );
    if (!userId)
      throw new Error(
        `virtualProxies.ticketAdd: "userId" parameter is required`
      );
    if (!userDirectory)
      throw new Error(
        `virtualProxies.ticketAdd: "userDirectory" parameter is required`
      );

    let data = {
      userId,
      userDirectory: userDirectory,
      ticket: ticket || "",
    };

    if (!ticket) delete data.ticket;

    return await this.proxyClient
      .Post(`${virtualProxy}/ticket`, data)
      .then((res) => res.data as ITicket);
  }
}
