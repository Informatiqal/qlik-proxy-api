import { QlikProxyClient } from "qlik-rest-api";
import { IHttpReturn } from "qlik-rest-api/dist/interfaces/interfaces";

export interface IEnums {
  key: {
    values: string[];
    usages: string[];
  };
}

export interface IClassAbout {
  default(): Promise<IHttpReturn<{}>>;
  /**
   * List of all Proxy API endpoints
   */
  description(): Promise<IHttpReturn<string[]>>;
  enums(): Promise<IHttpReturn<{}>>;
  /**
   * OpenApi endpoints
   */
  openApi(): Promise<IHttpReturn<string[]>>;
  relations(): Promise<IHttpReturn<string[]>>;
  openApiInterface(interfaceName: string): Promise<IHttpReturn<{}>>;
}

export class About implements IClassAbout {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async default() {
    return await this.proxyClient.Get<{}>(`about/default`);
  }

  public async description() {
    return await this.proxyClient.Get<string[]>(`about/description`);
  }

  public async enums() {
    return await this.proxyClient.Get<{}>(`about/enums`);
  }

  public async openApi() {
    return await this.proxyClient.Get<string[]>(`about/openapi`);
  }

  public async relations() {
    return await this.proxyClient.Get<string[]>(`about/relations`);
  }

  public async openApiInterface(interfaceName: string) {
    if (!interfaceName)
      throw new Error(
        `about.openApiInterface: "interfaceName" parameter is required`
      );
    return await this.proxyClient.Get<{}>(`about/openapi/${interfaceName}`);
  }
}
