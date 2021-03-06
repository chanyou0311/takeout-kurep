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
  const classes = useStyles();
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

  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link href="/">
            <Typography component="h1" variant="h6" className={classes.title}>
              呉グルメ☆お家でお店ご飯
            </Typography>
          </Link>
          <Link href="/restaurants/create">
            <Button color="inherit">店舗追加</Button>
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
