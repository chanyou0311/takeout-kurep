import { useRouter } from "next/router";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import db from "../../lib/db";
import Restaurant from "../../domain/restaurant/restaurant";

const RestaurantDetail: NextPage = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restaurantId = router.query.id;
    if (typeof restaurantId === "string") {
      console.log("get restaurant");
      const unsubscribe = db
        .collection("restaurants")
        .doc(restaurantId)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const restaurant = Restaurant.fromDocumentData(snapshot.data());
            setRestaurant(restaurant);
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
        <h2>{restaurant.name}</h2>
        <p>{restaurant.id}</p>
      </div>
    );
  }
};

export default RestaurantDetail;
