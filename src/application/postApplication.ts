import Application from "./support/application";
import LocationRepositoryInterface from "../domain/location/locationRepositoryInterface";

export default class LocationApplication extends Application {
  constructor(private locationRepository: LocationRepositoryInterface) {
    super();
  }
}
