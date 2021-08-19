import { QlikRepositoryClient } from "qlik-rest-api";

export interface IClassAlive {
  get(): Promise<boolean>;
}

export class Alive implements IClassAlive {
  private proxyClient: QlikRepositoryClient;
  constructor(proxyClient: QlikRepositoryClient) {
    this.proxyClient = proxyClient;
  }

  public async get() {
    return await this.proxyClient
      .Get(`alive`)
      .then((res) => res.data.value as boolean);
  }
}
