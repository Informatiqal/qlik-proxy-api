export interface IUser {
  UserDirectory: string;
  UserId: string;
}

export interface ISession extends IUser {
  Attributes: string[];
  SessionId: string;
  NewUser?: boolean;
}

export interface IError {
  userId?: string;
  userDir?: string;
  message: string;
}

export interface INotified {
  changeType?: string;
  objectType?: string;
  objectID?: string;
  changedProperties?: string[];
  engineID?: string;
  engineType?: string;
  originatorNodeID?: string;
  originatorHostName?: string;
  originatorContextID?: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface IvpDeleteSession extends ISession {
  lastSessionForUser?: boolean;
}

export interface ITicket {
  UserDirectory: string;
  UserId: string;
  Attributes: string[];
  Ticket: string;
  TargetUri: string;
}

export interface IEnums {
  key: {
    values: string[];
    usages: string[];
  };
}
