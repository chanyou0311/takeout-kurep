import Repository from "../support/repository";
import IRestaurantRepository from "../../domain/restaurant/restaurantRepositoryInterface";
import Restaurant from "../../domain/restaurant/restaurant";
import { resolve } from "dns";

export default class RestaurantFirebaseRepository extends Repository
  implements IRestaurantRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<Restaurant[]> {
    const snapshot = await this.db.collection("restaurants").get();
    const restaurants = snapshot.docs.map((doc) =>
      Restaurant.fromDocumentData(doc.data())
    );
    return restaurants;
  }

  async insert(restaurant: Restaurant): Promise<void> {
    const snapshot = await this.db
      .collection("restaurants")
      .doc(restaurant.id)
      .set(restaurant.toObject());
  }
}
