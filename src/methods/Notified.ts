import { QlikProxyClient } from "qlik-rest-api";
export interface INotified {
  changeType?: string;
  objectType?: string;
  objectID?: string;
  changedProperties?: string[];
  engineID?: string;
  engineType?: string;
  originatorNodeID?: string;
  originatorHostName?: string;
  originatorContextID?: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface IClassNotified {
  get(arg: INotified): Promise<number>;
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
