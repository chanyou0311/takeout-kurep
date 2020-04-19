import Entity from "../support/entity";
import { firestore } from "firebase";
import * as uuid from "node-uuid";
import Moment from "moment";
import "moment/locale/ja";

enum Weekday {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

interface ITime {
  value: string;
}

class Time extends Entity implements ITime {
  value: string;
  constructor(initialValue: ITime) {
    super();
    this.value = initialValue.value;
  }
}

interface IBusinessHours {
  weekday: Weekday;
  openingTime: Time;
  closingTime: Time;
}

export default class BusinessHours extends Entity implements IBusinessHours {
  weekday: Weekday;
  openingTime: Time;
  closingTime: Time;

  constructor(initialValues: IBusinessHours) {
    super();
    this.weekday = initialValues.weekday;
    this.openingTime = initialValues.openingTime;
    this.closingTime = initialValues.closingTime;
  }

  public createNewBusinessHours(values: IBusinessHours): BusinessHours {
    return new BusinessHours(values);
  }
}
