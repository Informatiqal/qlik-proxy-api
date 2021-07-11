import { QlikProxyApi } from "../main";

export class About {
  constructor() {}

  public async aboutDefault(this: QlikProxyApi): Promise<any> {
    return await this.proxyClient
      .Get(`about/default`)
      .then((res) => res.data as string[]);
  }

  public async aboutDescription(this: QlikProxyApi): Promise<string[]> {
    return await this.proxyClient
      .Get(`about/default`)
      .then((res) => res.data as string[]);
  }

  public async aboutEnums(this: QlikProxyApi): Promise<string[]> {
    return await this.proxyClient.Get(`about/enums`).then((res) => {
      let a = 1;
      return res.data as string[];
    });
  }

  //   public async aboutOpenApi(this: QlikProxyApi): Promise<string[]> {
  //     return await this.proxyClient
  //       .Get(`about/openapi`)
  //       .then((res) => res.data as string[]);
  //   }

  //   public async aboutApiRelations(this: QlikRepoApi): Promise<string[]> {
  //     return await this.proxyClient
  //       .Get(`relations`)
  //       .then((res) => res.data as string[]);
  //   }

  //   public async aboutApiDescription(this: QlikRepoApi): Promise<string[]> {
  //     return await this.proxyClient
  //       .Get(`about/api/description`)
  //       .then((res) => res.data as string[]);
  //   }

  //   public async aboutApiDefaults(this: QlikRepoApi, path: string): Promise<any> {
  //     return await this.proxyClient
  //       .Get(`about/api/default/${path}`)
  //       .then((res) => res.data as any);
  //   }
}
