import { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Restaurant from "../../domain/restaurant/restaurant";
import RestaurantFirebaseRepository from "../../infrastructure/restaurant/restaurantFirebaseRepository";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Grid,
  makeStyles,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
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
  addBusinessHours: {
    margin: theme.spacing(3, 0, 2),
  },
  submitButtom: {
    margin: theme.spacing(2, 0, 2),
  },
  resetButtom: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const RestaurantCreate: NextPage = () => {
  const classes = useStyles();

  const [restaurant, setRestaurant] = useState<Restaurant>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { register, handleSubmit, errors, control, reset } = useForm<
    Restaurant
  >();

  const areas = [
    "中央",
    "広",
    "海岸",
    "川尻",
    "阿賀",
    "天応",
    "安浦",
    "その他",
  ];
  const inputLabel = useRef(null);

  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (inputLabel.current !== null) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, [inputLabel]);

  const onSubmit = handleSubmit((data) => {
    (async () => {
      setIsCreating(true);
      const restaurantRepository = new RestaurantFirebaseRepository();
      const restaurant = Restaurant.createNewRestaurant(data);
      restaurantRepository.insert(restaurant);
      setRestaurant(restaurant);
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
            <Typography component="h1" variant="h6" className={classes.title}>
              呉グルメ☆お家でお店ご飯
            </Typography>
          </Link>
          <Link href="/restaurants/create">
            <Button color="inherit">店舗追加</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h4" gutterBottom>
            店舗の新規追加
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid spacing={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography component="h4" variant="h5" gutterBottom>
                    基本情報
                  </Typography>
                </Grid>
              </Grid>
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
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.area && true}
                  >
                    <InputLabel id="area-label" ref={inputLabel}>
                      エリア
                    </InputLabel>
                    <Controller
                      as={
                        <Select labelWidth={labelWidth} value="10">
                          {areas.map((area, index) => (
                            <MenuItem value={area} key={index}>
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      name="area"
                      rules={{ required: true }}
                      control={control}
                      defaultValue=""
                    />
                    <FormHelperText>必須</FormHelperText>
                  </FormControl>
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
                    inputRef={register({
                      pattern: {
                        value: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
                        message: "半角ハイフン区切りで入力してください",
                      },
                    })}
                    variant="outlined"
                    fullWidth
                    placeholder="0823-12-3456"
                    name="phoneNumber"
                    id="phoneNumber"
                    label="電話番号"
                    helperText={
                      errors.phoneNumber && errors.phoneNumber.message
                    }
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
                    rows={3}
                    multiline
                    name="note"
                    id="note"
                    label="備考"
                    error={errors.note && true}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButtom}
                    disabled={isCreated}
                  >
                    新規追加
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="default"
                    size="large"
                    className={classes.resetButtom}
                    onClick={() => {
                      reset();
                    }}
                  >
                    リセット
                  </Button>
                </Grid>
                {isCreating && <CircularProgress />}
                {isCreated && (
                  <Grid item xs={12} sm={12}>
                    <Typography component="p">
                      {restaurant.name} が追加されました。
                    </Typography>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.resetButtom}
                      onClick={() => {
                        reset();
                        setIsCreated(false);
                      }}
                    >
                      続けて別の店舗を追加する
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
export default RestaurantCreate;
