import { QlikProxyApi } from "../main";

import { ISession } from "../Interfaces";

export class User {
  constructor() {}

  public async userGet(
    this: QlikProxyApi,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    if (!userId) throw new Error(`userGet: "userId" parameter is required`);
    if (!userDir) throw new Error(`userGet: "userDir" parameter is required`);

    return await this.proxyClient
      .Get(`user/${encodeURI(userDir)}/${encodeURI(userId)}`)
      .then((res) => res.data as ISession[]);
  }

  public async userRemove(
    this: QlikProxyApi,
    userId: string,
    userDir: string
  ): Promise<ISession[]> {
    if (!userId) throw new Error(`userRemove: "userId" parameter is required`);
    if (!userDir)
      throw new Error(`userRemove: "userDir" parameter is required`);

    return await this.proxyClient
      .Delete(`user/${encodeURI(userDir)}/${encodeURI(userId)}`)
      .then((res) => res.data as ISession[]);
  }
}
