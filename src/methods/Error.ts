import { QlikProxyApi } from "../main";

import { IError } from "../Interfaces";

export class Errors {
  constructor() {}

  public async error(this: QlikProxyApi, arg: IError): Promise<string> {
    if (!arg.message) throw new Error(`error: "message" parameter is required`);
    let data = {
      message: arg.message,
      userId: arg.userId || "",
      userDirectory: arg.userDir || "",
    };

    if (!arg.userId) delete data.userId;
    if (!arg.userDir) delete data.userDirectory;

    return await this.proxyClient
      .Post(`health`, { ...data })
      .then((res) => res.data as string);
  }
}
