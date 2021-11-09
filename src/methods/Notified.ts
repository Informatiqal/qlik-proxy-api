import { QlikProxyClient } from "qlik-rest-api";
export interface INotified {
  /**
   * @type string
   * @optional
   */
  changeType?: string;
  /**
   * @type string
   * @optional
   */
  objectType?: string;
  /**
   * @type string
   * @optional
   */
  objectID?: string;
  /**
   * @type string[]
   * @optional
   */
  changedProperties?: string[];
  /**
   * @type string
   * @optional
   */
  engineID?: string;
  /**
   * @type string
   * @optional
   */
  engineType?: string;
  /**
   * @type string
   * @optional
   */
  originatorNodeID?: string;
  /**
   * @type string
   * @optional
   */
  originatorHostName?: string;
  /**
   * @type string
   * @optional
   */
  originatorContextID?: string;
  /**
   * @type string
   * @optional
   */
  createdDate?: string;
  /**
   * @type string
   * @optional
   */
  modifiedDate?: string;
}

export interface IClassNotified {
  /**
   * @param Object {@link INotified}
   * @returns Promise number
   */
  get(arg?: INotified): Promise<number>;
}

export class Notified implements IClassNotified {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async get(arg: INotified): Promise<number> {
    if (!arg) throw new Error(`notified: at least one parameter is required`);
    if (Object.keys(arg).length == 0)
      throw new Error(`notified.get: at least one parameter is required`);

    return await this.proxyClient
      .Post(`notified`, { ...arg })
      .then((res) => res.status as number);
  }
}
