import { NextPage } from "next";
import Link from "next/link";
import db from "../lib/db";
import Restaurant from "../domain/restaurant/restaurant";
import RestaurantFirebaseRepository from "../infrastructure/restaurant/restaurantFirebaseRepository";
import { useState, FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Paper,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestaurantCard from "../components/RestaurantCard";

type FormData = {
  name: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    root: {
      // flexGrow: 1,
      width: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const Home: NextPage<{ restaurants: Restaurant[] }> = () => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    console.log("get restaurants");
    let isMounted = true;

    (async () => {
      const restaurantRepository = new RestaurantFirebaseRepository();
      const newRestaurants = await restaurantRepository.getAll();
      if (isMounted) {
        setRestaurants(newRestaurants);
      }
      console.log(newRestaurants);
    })();

    return () => {
      isMounted = false;
      console.log("cleanup");
    };
  }, []);

  // const onSubmit = (data: FormData) => {
  //   const newRestaurant = Restaurant.createNewRestaurant(data.name);
  //   db.collection("restaurants").doc(newRestaurant.id).set(newRestaurant.toObject());
  //   reset();
  // };
  const onDelete = (data) => {
    console.log("on delete");
    console.log(data.id);
  };
  const imageUrl =
    "http://placehold.jp/24/eeeeee/999999/360x270.png?text=%E7%94%BB%E5%83%8F%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93";

  const tileData = [
    { img: imageUrl, title: "hoge", cols: 1 },
    { img: imageUrl, title: "hoge", cols: 1 },
    { img: imageUrl, title: "hoge", cols: 1 },
    { img: imageUrl, title: "hoge", cols: 1 },
    { img: imageUrl, title: "hoge", cols: 1 },
  ];
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              TAKEOUT KUREP
            </Typography>
          </Link>
          <Link href="/restaurants/create">
            <Button color="inherit">店舗の新規追加</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <h2>ロケーション一覧</h2>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {restaurants.map((restaurant) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <RestaurantCard restaurant={restaurant} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      {/* <div>
        <h2>ロケーション追加</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">name: </label>
            <input
              name="name"
              defaultValue=""
              ref={register({ required: true })}
            />
            <p className="error">
              {errors.name && <span>This field is required</span>}
            </p>
          </div>
          <input type="submit" />
        </form>
      </div> */}
      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </React.Fragment>
  );
};
export default Home;
