import { QlikProxyClient } from "qlik-rest-api";

import { About, IClassAbout } from "./methods/About";
import { Alive, IClassAlive } from "./methods/Alive";
import { Errors, IClassErrors } from "./methods/Error";
import { Health, IClassHealth } from "./methods/Health";
import { Notified, IClassNotified } from "./methods/Notified";
import { Sessions, IClassSessions } from "./methods/Sessions";
import { Tickets, IClassTickets } from "./methods/Ticket";

export namespace QlikProxyApi {
  export class client {
    public proxyClient: QlikProxyClient;

    public about: IClassAbout;
    /**
     * Status of the proxy service
     */
    public alive: IClassAlive;
    public errors: IClassErrors;
    /**
     * Health status of the proxy service
     */
    public health: IClassHealth;
    public notified: IClassNotified;
    /**
     * Sessions operations
     */
    public sessions: IClassSessions;
    /**
     * Add new ticket
     */
    public tickets: IClassTickets;
    constructor(public proxyConfig: any) {
      this.proxyClient = new QlikProxyClient(proxyConfig);

      this.about = new About(this.proxyClient);
      this.alive = new Alive(this.proxyClient);
      this.errors = new Errors(this.proxyClient);
      this.health = new Health(this.proxyClient);
      this.notified = new Notified(this.proxyClient);
      this.sessions = new Sessions(this.proxyClient);
      this.tickets = new Tickets(this.proxyClient);
    }
  }
}
