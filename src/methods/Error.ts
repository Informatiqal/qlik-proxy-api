import { QlikProxyClient } from "qlik-rest-api";

export interface IError {
  /**
   * @type string
   * @optional
   */
  userId?: string;
  /**
   * @type string
   * @optional
   */
  userDirectory?: string;
  /**
   * @type string
   */
  message: string;
}

export interface IClassErrors {
  /**
   *
   * @param Object {@link IError}
   * @returns Promise string
   */
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
      .Post<string>(`health`, { ...data })
      .then((res) => res.data);
  }
}
