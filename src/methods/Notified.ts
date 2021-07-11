import { QlikProxyApi } from "../main";

import { INotified } from "../Interfaces";

export class Notified {
  constructor() {}

  public async notified(this: QlikProxyApi, arg: INotified): Promise<number> {
    return await this.proxyClient
      .Post(`notified`, { ...arg })
      .then((res) => res.status as number);
  }
}
