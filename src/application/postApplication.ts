import Application from "./support/application";
import RestaurantRepositoryInterface from "../domain/restaurant/restaurantRepositoryInterface";

export default class RestaurantApplication extends Application {
  constructor(private restaurantRepository: RestaurantRepositoryInterface) {
    super();
  }
}
