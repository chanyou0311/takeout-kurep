import Entity from "../support/entity";
import { firestore } from "firebase";
import * as uuid from "node-uuid";

interface IWeekday {
  weekday: string;
  openingTime: string;
  closingTime: string;
}

export default class Weekday extends Entity implements IWeekday {
  weekday: string;
  openingTime: string;
  closingTime: string;
}
