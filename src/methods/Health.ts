import { QlikProxyClient } from "qlik-rest-api";

export interface IClassHealth {
  /**
   * Get the health status of the proxy service
   * @returns Promise number
   */
  get(): Promise<number>;
}

export class Health implements IClassHealth {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async get() {
    return await this.proxyClient
      .Get(`health`)
      .then((res) => res.status as number);
  }
}
