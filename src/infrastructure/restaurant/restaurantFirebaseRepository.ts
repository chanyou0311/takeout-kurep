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
    // TODO: あとでコレクションをrestaurantsに変更する
    const snapshot = await this.db.collection("locations").get();
    const restaurants = snapshot.docs.map((doc) =>
      Restaurant.fromDocumentData(doc.data())
    );
    return restaurants;
  }

  async insert(restaurant: Restaurant): Promise<void> {
    // TODO: あとでコレクションをrestaurantsに変更する
    const snapshot = await this.db
      .collection("locations")
      .doc(restaurant.id)
      .set(restaurant.toObject());
  }
}
