export class Alert {
  type: AlertType;
  message: string;
  alertId: string;
  keepAfterRouteChange: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export enum AlertTime {
  Short = 1000,
  Midle = 2000,
  Long = 3000
}
