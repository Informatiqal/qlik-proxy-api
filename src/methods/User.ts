import { QlikProxyApi } from "../main";

import { ISession } from "../Interfaces";

export class User {
  constructor() {}

  public async userGet(
    this: QlikProxyApi,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Get(`user/${encodeURI(userDir)}/${encodeURI(userId)}`)
      .then((res) => res.data as ISession[]);
  }

  public async userRemove(
    this: QlikProxyApi,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    return await this.proxyClient
      .Delete(`user/${encodeURI(userDir)}/${encodeURI(userId)}`)
      .then((res) => res.data as ISession[]);
  }
}
