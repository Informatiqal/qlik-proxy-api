import { QlikRepositoryClient } from "qlik-rest-api";
import { ISession } from "./Sessions";

export interface IClassSession {
  remove(): Promise<number>;
  details: ISession;
}

export class Session implements IClassSession {
  private id: string;
  private proxyClient: QlikRepositoryClient;
  details: ISession;
  virtualProxy: string;
  constructor(
    proxyClient: QlikRepositoryClient,
    id: string,
    details?: ISession,
    virtualProxy?: string
  ) {
    this.proxyClient = proxyClient;
    this.id = id;
    this.details = details;
    this.virtualProxy = virtualProxy;
  }

  async init() {
    if (!this.details) {
      let url = `session`;
      if (this.virtualProxy) url = `${this.virtualProxy}/session`;
      return await this.proxyClient
        .Get(`${url}/${this.id}`)
        .then((res) => res.data as ISession);
    }
  }

  public async remove() {
    let url = `session/${this.details.SessionId}`;
    if (this.virtualProxy)
      url = `${this.virtualProxy}/session/${this.details.SessionId}`;
    return await this.proxyClient.Delete(url).then((res) => res.status);
  }
}
