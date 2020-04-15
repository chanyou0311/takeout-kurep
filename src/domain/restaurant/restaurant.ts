import Entity from "../support/entity";
import { firestore } from "firebase";
import * as uuid from "node-uuid";

export default class Restaurant extends Entity {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public openingTime: string,
    public closingTime: string,
    public phoneNumber: string,
    public note: string,
    public canDeliver: boolean,
    public canTakeOut: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    super();
  }

  static reconstruct(
    id: string,
    name: string,
    address: string,
    openingTime: string,
    closingTime: string,
    phoneNumber: string,
    note: string,
    canDeliver: boolean,
    canTakeOut: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Restaurant {
    return new Restaurant(
      id,
      name,
      address,
      openingTime,
      closingTime,
      phoneNumber,
      note,
      canDeliver,
      canTakeOut,
      createdAt,
      updatedAt
    );
  }
  static createNewRestaurant(
    name: string,
    canDeliver: boolean,
    canTakeOut: boolean,
    openingTime: string = "",
    closingTime: string = "",
    phoneNumber: string = "",
    address: string = "",
    note: string = ""
  ): Restaurant {
    const id = uuid.v4();
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    return new Restaurant(
      id,
      name,
      address,
      openingTime,
      closingTime,
      phoneNumber,
      note,
      canDeliver,
      canTakeOut,
      createdAt,
      updatedAt
    );
  }

  static fromDocumentData(data: firestore.DocumentData): Restaurant {
    return new Restaurant(
      data.id,
      data.name,
      data.address,
      data.openingTime,
      data.closingTime,
      data.phoneNumber,
      data.note,
      data.canDeliver,
      data.canTakeOut,
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    );
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      openingTime: this.openingTime,
      closingTime: this.closingTime,
      phoneNumber: this.phoneNumber,
      note: this.note,
      canDeliver: this.canDeliver,
      canTakeOut: this.canTakeOut,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public canDeliverDisplay() {
    if (this.canDeliver) {
      return "対応";
    } else {
      return "非対応";
    }
  }

  public canTakeOutDisplay() {
    if (this.canTakeOut) {
      return "対応";
    } else {
      return "非対応";
    }
  }

  public noteDisplay() {
    return this.note;
  }

  public addressDisplay() {
    if (this.address === "") {
      return "未登録";
    }
    return this.address;
  }

  private dateDisplay(date: Date) {
    return date.toLocaleString();
  }

  public createdAtDisplay() {
    return this.dateDisplay(this.createdAt);
  }

  public updatedAtDisplay() {
    return this.dateDisplay(this.updatedAt);
  }
}
