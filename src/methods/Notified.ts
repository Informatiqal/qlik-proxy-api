import { QlikProxyApi } from "../main";

import { INotified } from "../Interfaces";

export class Notified {
  constructor() {}

  public async notified(this: QlikProxyApi, arg: INotified): Promise<number> {
    if (!arg) throw new Error(`notified: at least one parameter is required`);
    if (Object.keys(arg).length == 0)
      throw new Error(`notified: at least one parameter is required`);

    return await this.proxyClient
      .Post(`notified`, { ...arg })
      .then((res) => res.status as number);
  }
}
