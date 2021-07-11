import { QlikProxyApi } from "../main";

export class Alive {
  constructor() {}

  public async alive(this: QlikProxyApi): Promise<number> {
    return await this.proxyClient
      .Get(`alive`)
      .then((res) => res.status as number);
  }
}
