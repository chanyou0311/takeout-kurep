import Entity from "../support/entity";
import { firestore } from "firebase";
import * as uuid from "node-uuid";

interface IRestaurant {
  id: string;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
  phoneNumber: string;
  note: string;
  canDeliver: boolean;
  canTakeOut: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default class Restaurant extends Entity implements IRestaurant {
  id: string;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
  phoneNumber: string;
  note: string;
  canDeliver: boolean;
  canTakeOut: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(initialValues: IRestaurant) {
    super();
    this.id = initialValues.id;
    this.name = initialValues.name;
    this.address = initialValues.address;
    this.openingTime = initialValues.openingTime;
    this.closingTime = initialValues.closingTime;
    this.phoneNumber = initialValues.phoneNumber;
    this.note = initialValues.note;
    this.canDeliver = initialValues.canDeliver;
    this.canTakeOut = initialValues.canTakeOut;
    this.createdAt = initialValues.createdAt;
    this.updatedAt = initialValues.updatedAt;
  }

  static reconstruct(values: IRestaurant): Restaurant {
    return new Restaurant(values);
  }

  static createNewRestaurant(
    values: Omit<IRestaurant, "id" | "createdAt" | "updatedAt">
  ): Restaurant {
    const id = uuid.v4();
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    return new Restaurant({ ...values, id, createdAt, updatedAt });
  }

  static fromDocumentData(data: firestore.DocumentData): Restaurant {
    const values = {
      id: data.id,
      name: data.name,
      address: data.address,
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      phoneNumber: data.phoneNumber,
      note: data.note,
      canDeliver: data.canDeliver,
      canTakeOut: data.canTakeOut,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
    return new Restaurant(values);
  }

  public toObject(): IRestaurant {
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
