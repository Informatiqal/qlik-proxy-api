import { QlikProxyApi } from "../main";

import { IEnums } from "../Interfaces";
import { Errors } from "./Error";

export class About {
  constructor() {}

  public async aboutDefault(this: QlikProxyApi): Promise<any> {
    return await this.proxyClient
      .Get(`about/default`)
      .then((res) => res.data as string[]);
  }

  public async aboutDescription(this: QlikProxyApi): Promise<string[]> {
    return await this.proxyClient
      .Get(`about/description`)
      .then((res) => res.data as string[]);
  }

  public async aboutEnums(this: QlikProxyApi): Promise<IEnums> {
    return await this.proxyClient.Get(`about/enums`).then((res) => {
      return res.data as IEnums;
    });
  }

  public async aboutOpenApi(this: QlikProxyApi): Promise<string[]> {
    return await this.proxyClient
      .Get(`about/openapi`)
      .then((res) => res.data as string[]);
  }

  public async aboutRelations(this: QlikProxyApi): Promise<string[]> {
    return await this.proxyClient
      .Get(`about/relations`)
      .then((res) => res.data as string[]);
  }

  public async aboutOpenApiInterface(
    this: QlikProxyApi,
    interfaceName: string
  ): Promise<Object> {
    if (!interfaceName)
      throw new Error(
        `aboutOpenApiInterface: "interfaceName" parameter is required`
      );
    return await this.proxyClient
      .Get(`about/openapi/${interfaceName}`)
      .then((res) => res.data);
  }
}
