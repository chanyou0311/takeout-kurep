import Restaurant from "./restaurant";

export default interface IRestaurantRepository {
  insert(restaurant: Restaurant): void;
  // update(restaurant: Restaurant): Restaurant;
  getAll(): Promise<Restaurant[]>;
  // getById(id: string): Restaurant;
}
