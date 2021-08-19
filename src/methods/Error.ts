import { QlikProxyClient } from "qlik-rest-api";

export interface IError {
  userId?: string;
  userDirectory?: string;
  message: string;
}

export interface IClassErrors {
  add(arg: IError): Promise<string>;
}
export class Errors implements IClassErrors {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async add(arg: IError): Promise<string> {
    if (!arg.message)
      throw new Error(`errors.add: "message" parameter is required`);
    let data = {
      message: arg.message,
      userId: arg.userId || "",
      userDirectory: arg.userDirectory || "",
    };

    if (!arg.userId) delete data.userId;
    if (!arg.userDirectory) delete data.userDirectory;

    return await this.proxyClient
      .Post(`health`, { ...data })
      .then((res) => res.data as string);
  }
}
