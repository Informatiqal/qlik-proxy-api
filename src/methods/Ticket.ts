import { QlikProxyClient } from "qlik-rest-api";

export interface ITicket {
  UserDirectory: string;
  UserId: string;
  Attributes: string[];
  Ticket: string;
  TargetUri: string;
}

export interface IClassTickets {
  add(
    userId: string,
    userDirectory: string,
    ticket?: string,
    virtualProxy?: string
  ): Promise<ITicket>;
}
export class Tickets implements IClassTickets {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async add(
    userId: string,
    userDirectory: string,
    virtualProxy?: string,
    ticket?: string
  ) {
    if (!userId) throw new Error(`ticket.add: "userId" parameter is required`);
    if (!userDirectory)
      throw new Error(`ticket.add: "userDirectory" parameter is required`);

    let url = "ticket";
    if (virtualProxy) url = `${virtualProxy}/ticket`;

    let data = {
      userId,
      userDirectory: userDirectory,
      ticket: ticket || "",
    };

    if (!ticket) delete data.ticket;

    return await this.proxyClient
      .Post(url, data)
      .then((res) => res.data as ITicket);
  }
}
