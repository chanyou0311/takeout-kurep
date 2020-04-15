import Repository from "../support/repository";
import RestaurantRepositoryInterface from "../../domain/restaurant/restaurantRepositoryInterface";

class restaurantFirebaseRepository extends Repository
  implements RestaurantRepositoryInterface {
    constructor() {
      super()
    }
  public getAll(set: React.Dispatch<React.SetStateAction<Restaurant[]>>) {
    const unsubscribe = this.db.collection("restaurants").onSnapshot((snapshot) => {
      const restaurants = snapshot.docs.map((doc) =>
        Restaurant.fromDocumentData(doc.data())
      );
      setRestaurants(restaurants);
  }
}
