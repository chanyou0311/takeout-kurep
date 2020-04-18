import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Restaurant from "../../domain/restaurant/restaurant";
import RestaurantFirebaseRepository from "../../infrastructure/restaurant/restaurantFirebaseRepository";
import {
  FormControlLabel,
  Checkbox,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  FormGroup,
  Box,
  TextField,
  Grid,
  makeStyles,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextareaAutosize,
  Avatar,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    // marginTop: theme.spacing(8),
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",

    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RestaurantCreate: NextPage = () => {
  const classes = useStyles();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { register, handleSubmit, errors } = useForm<Restaurant>();
  const onSubmit = handleSubmit((data) => {
    (async () => {
      setIsCreating(true);
      const restaurantRepository = new RestaurantFirebaseRepository();
      const restaurant = Restaurant.createNewRestaurant(data);
      // restaurantRepository.insert(restaurant);

      setIsCreating(false);
      setIsCreated(true);
    })();
  });
  return (
    <div>
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
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h4" gutterBottom>
            店舗の新規追加
          </Typography>
          {/* <h2>sign up</h2> */}
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register({ required: true })}
                  variant="outlined"
                  fullWidth
                  name="name"
                  id="name"
                  label="店名"
                  helperText="必須"
                  error={errors.name && true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={register}
                      name="canDeliver"
                      id="canDeliver"
                      color="primary"
                    />
                  }
                  label="デリバリー対応"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={register}
                      name="canTakeOut"
                      id="canTakeOut"
                      color="primary"
                    />
                  }
                  label="テイクアウト対応"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                  name="address"
                  id="address"
                  label="住所"
                  error={errors.address && true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  id="phoneNumber"
                  label="電話番号"
                  error={errors.phoneNumber && true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                  name="openingTime"
                  id="openingTime"
                  label="開店時間"
                  error={errors.openingTime && true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                  name="closingTime"
                  id="closingTime"
                  label="閉店時間"
                  error={errors.closingTime && true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                {/* <TextareaAutosize placeholder="aa"></TextareaAutosize> */}
                <TextField
                  inputRef={register}
                  variant="outlined"
                  fullWidth
                  rows={3}
                  multiline
                  name="note"
                  id="note"
                  label="備考"
                  error={errors.note && true}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
              disabled={isCreated}
            >
              新規追加
            </Button>

            {isCreating && <CircularProgress />}
            {isCreated && (
              <Typography component="p">追加されました。</Typography>
            )}
          </form>
        </Paper>
      </Container>
      {/* <Box>
        <form onSubmit={onSubmit}>
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
      </Box> */}
    </div>
  );
};
export default RestaurantCreate;
