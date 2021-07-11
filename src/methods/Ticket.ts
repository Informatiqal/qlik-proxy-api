import { QlikProxyApi } from "../main";

import { ITicket } from "../Interfaces";

export class Ticket {
  constructor() {}

  public async ticketAdd(
    this: QlikProxyApi,
    userId: string,
    userDir: string,
    ticket?: string
  ): Promise<ITicket> {
    let data = {
      userId,
      userDirectory: userDir,
      ticket: ticket || "",
    };

    if (!ticket) delete data.ticket;

    return await this.proxyClient
      .Post(`ticket`, data)
      .then((res) => res.data as ITicket);
  }
}
