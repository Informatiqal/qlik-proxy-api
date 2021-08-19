import { QlikRepositoryClient } from "qlik-rest-api";

export interface IClassHealth {
  get(): Promise<number>;
}

export class Health implements IClassHealth {
  private proxyClient: QlikRepositoryClient;
  constructor(proxyClient: QlikRepositoryClient) {
    this.proxyClient = proxyClient;
  }

  public async get() {
    return await this.proxyClient
      .Get(`health`)
      .then((res) => res.status as number);
  }
}
