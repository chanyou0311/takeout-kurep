import { useRouter } from "next/router";
import Header from "../../components/Header";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import db from "../../lib/db";
import Location from "../../domain/location/location";

const LocationDetail: NextPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState<Location>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const locationId = router.query.id;
    if (typeof locationId === "string") {
      console.log("get location");
      const unsubscribe = db
        .collection("locations")
        .doc(locationId)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const location = Location.fromDocumentData(snapshot.data());
            setLocation(location);
          } else {
            console.log("snapshot is not exists");
            router.push("");
          }
          setIsLoading(false);
        });
      return () => {
        unsubscribe();
      };
    } else {
      setIsLoading(true);
      return () => {};
    }
  }, [router.query]);

  if (isLoading === true) {
    return <p>is loading...</p>;
  } else {
    return (
      <div>
        <Header />
        <h2>{location.name}</h2>
        <p>{location.id}</p>
      </div>
    );
  }
};

export default LocationDetail;
