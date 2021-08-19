import { QlikProxyClient } from "qlik-rest-api";

export interface IEnums {
  key: {
    values: string[];
    usages: string[];
  };
}

export interface IClassAbout {
  default(): Promise<any>;
  description(): Promise<string[]>;
  enums(): Promise<IEnums>;
  openApi(): Promise<string[]>;
  relations(): Promise<string[]>;
  openApiInterface(interfaceName: string): Promise<Object>;
}

export class About implements IClassAbout {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async default() {
    return await this.proxyClient
      .Get(`about/default`)
      .then((res) => res.data as string[]);
  }

  public async description() {
    return await this.proxyClient
      .Get(`about/description`)
      .then((res) => res.data as string[]);
  }

  public async enums() {
    return await this.proxyClient.Get(`about/enums`).then((res) => {
      return res.data as IEnums;
    });
  }

  public async openApi() {
    return await this.proxyClient
      .Get(`about/openapi`)
      .then((res) => res.data as string[]);
  }

  public async relations() {
    return await this.proxyClient
      .Get(`about/relations`)
      .then((res) => res.data as string[]);
  }

  public async openApiInterface(interfaceName: string) {
    if (!interfaceName)
      throw new Error(
        `about.openApiInterface: "interfaceName" parameter is required`
      );
    return await this.proxyClient
      .Get(`about/openapi/${interfaceName}`)
      .then((res) => res.data);
  }
}
