import { QlikProxyClient } from "qlik-rest-api";
import { About } from "./methods/About";
import { Alive } from "./methods/Alive";
import { Errors } from "./methods/Error";
import { Health } from "./methods/Health";
import { Notified } from "./methods/Notified";
import { Session } from "./methods/Session";
import { Ticket } from "./methods/Ticket";
import { User } from "./methods/User";
import { VirtualProxy } from "./methods/VirtualProxy";
import {
  ITicket,
  IUser,
  IEnums,
  IError,
  INotified,
  ISession,
  IvpDeleteSession,
} from "./Interfaces";

export {
  ITicket,
  IEnums,
  IError,
  INotified,
  ISession,
  IvpDeleteSession,
  IUser,
};

export class QlikProxyApi {
  public proxyClient: QlikProxyClient;
  constructor(public proxyConfig: any) {
    this.proxyClient = new QlikProxyClient(proxyConfig);
  }

  aboutDefault = About.prototype.aboutDefault;
  aboutDescription = About.prototype.aboutDescription;
  aboutEnums = About.prototype.aboutEnums;
  aboutOpenApi = About.prototype.aboutOpenApi;
  aboutOpenApiInterface = About.prototype.aboutOpenApiInterface;
  aboutRelations = About.prototype.aboutRelations;

  alive = Alive.prototype.alive;

  error = Errors.prototype.error;

  health = Health.prototype.health;

  notified = Notified.prototype.notified;

  sessionGetAll = Session.prototype.sessionGetAll;
  sessionGet = Session.prototype.sessionGet;
  sessionGetAllForUserId = Session.prototype.sessionGetAllForUserId;
  sessionGetAllForUserDir = Session.prototype.sessionGetAllForUserDir;
  sessionRemove = Session.prototype.sessionRemove;
  sessionAdd = Session.prototype.sessionAdd;

  ticketAdd = Ticket.prototype.ticketAdd;

  userGet = User.prototype.userGet;
  userRemove = User.prototype.userRemove;

  virtualProxySessionAdd = VirtualProxy.prototype.virtualProxySessionAdd;
  virtualProxySessionGet = VirtualProxy.prototype.virtualProxySessionGet;
  virtualProxySessionGetAll = VirtualProxy.prototype.virtualProxySessionGetAll;
  virtualProxySessionGetForUser =
    VirtualProxy.prototype.virtualProxySessionGetForUser;
  virtualProxySessionRemove = VirtualProxy.prototype.virtualProxySessionRemove;
  virtualProxySessionRemoveForUser =
    VirtualProxy.prototype.virtualProxySessionRemoveForUser;
  virtualProxyTicketAdd = VirtualProxy.prototype.virtualProxyTicketAdd;
}
