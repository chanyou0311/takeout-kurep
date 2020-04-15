import Repository from "../support/repository";
import RestaurantRepositoryInterface from "../../domain/restaurant/restaurantRepositoryInterface";
import Restaurant from "../../domain/restaurant/restaurant";
import { resolve } from "dns";

export default class restaurantFirebaseRepository extends Repository
  implements RestaurantRepositoryInterface {
  constructor() {
    super();
  }

  async getAll(): Promise<Restaurant[]> {
    const snapshot = await this.db.collection("locations").get();
    const restaurants = snapshot.docs.map((doc) =>
      Restaurant.fromDocumentData(doc.data())
    );
    return restaurants;
  }
}
