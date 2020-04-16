import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import Restaurant from "../../domain/restaurant/restaurant";
import RestaurantFirebaseRepository from "../../infrastructure/restaurant/restaurantFirebaseRepository";

const RestaurantCreate: NextPage = () => {
  const { register, handleSubmit, watch, errors } = useForm<Restaurant>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    (async () => {
      const restaurantRepository = new RestaurantFirebaseRepository();

      const restaurant = Restaurant.createNewRestaurant(data);

      restaurantRepository.insert(restaurant);
      console.log(restaurant);
    })();
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">店名</label>
          <input
            name="name"
            defaultValue=""
            placeholder="店名"
            ref={register({ required: true })}
          />
          {errors.name && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="address">住所</label>
          <input
            name="address"
            defaultValue=""
            placeholder="住所"
            ref={register({ required: true })}
          />
          {errors.address && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="openingTime">開店時間</label>
          <input
            name="openingTime"
            defaultValue=""
            placeholder="開店時間"
            ref={register({ required: true })}
          />
          {errors.openingTime && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="closingTime">閉店時間</label>
          <input
            name="closingTime"
            defaultValue=""
            placeholder="閉店時間"
            ref={register({ required: true })}
          />
          {errors.closingTime && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="phoneNumber">電話番号</label>
          <input
            name="phoneNumber"
            defaultValue=""
            placeholder="電話番号"
            ref={register({ required: true })}
          />
          {errors.phoneNumber && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="note">備考</label>
          <input
            name="note"
            defaultValue=""
            placeholder="備考"
            ref={register({ required: true })}
          />
          {errors.closingTime && <span>必須です。</span>}
        </div>
        <div>
          <label htmlFor="canDeliver">デリバリー対応</label>
          <input type="checkbox" name="canDeliver" ref={register} />
        </div>
        <div>
          <label htmlFor="canTakeOut">テイクアウト対応</label>
          <input type="checkbox" name="canTakeOut" ref={register} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
export default RestaurantCreate;
