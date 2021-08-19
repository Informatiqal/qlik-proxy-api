import { QlikProxyClient } from "qlik-rest-api";

import { About, IClassAbout } from "./methods/About";
import { Alive, IClassAlive } from "./methods/Alive";
import { Errors, IClassErrors } from "./methods/Error";
import { Health, IClassHealth } from "./methods/Health";
import { Notified, IClassNotified } from "./methods/Notified";
import { Sessions, IClassSessions } from "./methods/Sessions";
import { Tickets, IClassTickets } from "./methods/Ticket";
import { VirtualProxies, IClassVirtualProxies } from "./methods/VirtualProxy";

export namespace QlikProxyApi {
  export class client {
    public proxyClient: QlikProxyClient;

    public about: IClassAbout;
    public alive: IClassAlive;
    public errors: IClassErrors;
    public health: IClassHealth;
    public notified: IClassNotified;
    public sessions: IClassSessions;
    public tickets: IClassTickets;
    public virtualProxies: IClassVirtualProxies;
    constructor(public proxyConfig: any) {
      this.proxyClient = new QlikProxyClient(proxyConfig);

      this.about = new About(this.proxyClient);
      this.alive = new Alive(this.proxyClient);
      this.errors = new Errors(this.proxyClient);
      this.health = new Health(this.proxyClient);
      this.notified = new Notified(this.proxyClient);
      this.sessions = new Sessions(this.proxyClient);
      this.tickets = new Tickets(this.proxyClient);
      this.virtualProxies = new VirtualProxies(this.proxyClient);
    }
  }
}
