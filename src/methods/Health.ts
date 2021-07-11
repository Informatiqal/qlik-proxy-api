import { QlikProxyApi } from "../main";

export class Health {
  constructor() {}

  public async health(this: QlikProxyApi): Promise<string> {
    return await this.proxyClient
      .Get(`health`)
      .then((res) => res.data as string);
  }
}
