import { QlikProxyClient } from "qlik-rest-api";
import { IHttpReturn } from "qlik-rest-api/dist/interfaces/interfaces";

export interface ITicket {
  /**
   * @type string
   */
  UserDirectory: string;
  /**
   * @type string
   */
  UserId: string;
  /**
   * User specific attributes
   * @optional
   * @example [  { "<Attribute1>": "value1a" },
        { "<Attribute1>": "value1b" }, [attributes are not unique]
        { "<Attribute2>": "" }, [value can be empty]
        { "<Attribute3>": "value3" },
        ...]
   */
  Attributes: { [k: string]: string }[];
  /**
   * @type string
   */
  Ticket: string;
  /**
   * @type string
   */
  TargetUri: string;
}

export interface ITicketCreate {
  /**
   * @type string
   */
  userId: string;
  /**
   * @type string
   */
  userDirectory: string;
  /**
   * @type string
   * @optional
   */
  ticket?: string;
  /**
   * @type string
   * @optional
   */
  virtualProxy?: string;
  /**
   * User specific attributes
   * @optional
   * @example [  { "<Attribute1>": "value1a" },
        { "<Attribute1>": "value1b" }, [attributes are not unique]
        { "<Attribute2>": "" }, [value can be empty]
        { "<Attribute3>": "value3" },
        ...]
   */
  attributes?: { [k: string]: string }[];
}

export interface IClassTickets {
  /**
   * Add new ticket
   * @param Object {@link ITicketCreate}
   * @returns Promise {@link ITicket}
   */
  add(arg: ITicketCreate): Promise<IHttpReturn<ITicket>>;
}

export class Tickets implements IClassTickets {
  private proxyClient: QlikProxyClient;
  constructor(proxyClient: QlikProxyClient) {
    this.proxyClient = proxyClient;
  }

  public async add(arg: ITicketCreate) {
    if (!arg.userId)
      throw new Error(`ticket.add: "userId" parameter is required`);
    if (!arg.userDirectory)
      throw new Error(`ticket.add: "userDirectory" parameter is required`);

    let url = "ticket";
    if (arg.virtualProxy) url = `${arg.virtualProxy}/ticket`;

    let data = {
      userId: arg.userId,
      userDirectory: arg.userDirectory,
      ticket: arg.ticket || "",
    };

    if (!arg.ticket) delete data.ticket;

    return await this.proxyClient.Post<ITicket>(url, data);
  }
}
