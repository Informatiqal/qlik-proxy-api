import { QlikProxyClient } from "qlik-rest-api";
import { ISession } from "./Sessions";

export interface IClassSession {
  /**
   * Remove the session
   * @returns Promise
   */
  remove(): Promise<number>;
  /**
   * Holds session details
   * {@link ISession}
   */
  details: ISession;
}

export class Session implements IClassSession {
  private id: string;
  private proxyClient: QlikProxyClient;
  details: ISession;
  virtualProxy: string;
  constructor(
    proxyClient: QlikProxyClient,
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
        .Get<ISession>(`${url}/${this.id}`)
        .then((res) => {
          this.details = res.data;
          return this.details;
        });
    }
  }

  public async remove() {
    let url = `session/${this.details.SessionId}`;
    if (this.virtualProxy)
      url = `${this.virtualProxy}/session/${this.details.SessionId}`;
    return await this.proxyClient.Delete(url).then((res) => res.status);
  }
}
