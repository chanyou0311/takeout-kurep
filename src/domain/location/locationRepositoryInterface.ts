import Post from "./location";

export default interface LocationRepositoryInterface {
  insert(location: Location): Location;
  update(location: Location): Location;
  getAll(): Promise<Location[]>;
  getById(id: string): Location;
}
