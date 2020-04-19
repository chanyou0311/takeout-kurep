import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { NextComponentType, NextPageContext } from "next";
import Restaurant from "../domain/restaurant/restaurant";

const useStyles = makeStyles({
  root: {
    // maxWidth: "400px",
    // width: "100%",
    // flexGrow: 1,
  },
  media: {
    height: 140,
  },
});

const RestaurantCard: NextComponentType<
  NextPageContext,
  {},
  { restaurant: Restaurant }
> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.restaurant.name}
          </Typography>
          <Typography variant="body2" component="p">
            エリア: {props.restaurant.area}
          </Typography>
          <Typography variant="body2" component="p">
            テイクアウト可能: {props.restaurant.canTakeOutDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            デリバリー可能: {props.restaurant.canDeliverDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            電話番号: {props.restaurant.phoneNumber}
          </Typography>
          <Typography variant="body2" component="p">
            住所: {props.restaurant.addressDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            その他: {props.restaurant.noteDisplay}
          </Typography>
          <Typography variant="body2" component="p">
            作成日時: {props.restaurant.createdAtDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            更新日時: {props.restaurant.updatedAtDisplay()}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Link href="/restaurants/[id]" as={`/restaurants/${props.restaurant.id}`}>
          <Button color="primary" disabled>
            詳しく見る（未実装）
          </Button>
        </Link>
      </CardActions> */}
    </Card>
  );
};

export default RestaurantCard;
