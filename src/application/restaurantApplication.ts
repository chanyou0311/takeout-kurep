import Application from "./support/application";
import IRestaurantRepository from "../domain/restaurant/restaurantRepositoryInterface";

export default class RestaurantApplication extends Application {
  constructor(private restaurantRepository: IRestaurantRepository) {
    super();
  }
}
