import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { NextComponentType, NextPageContext } from "next";
import Location from "../domain/location/location";

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

const LocationCard: NextComponentType<
  NextPageContext,
  {},
  { location: Location }
> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.location.name}
          </Typography>
          <Typography variant="body2" component="p">
            テイクアウト可能: {props.location.canTakeOutDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            デリバリー可能: {props.location.canDeliverDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            電話番号: {props.location.phoneNumber}
          </Typography>
          <Typography variant="body2" component="p">
            住所: {props.location.addressDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            営業開始時間: {props.location.openingTime}
          </Typography>
          <Typography variant="body2" component="p">
            営業終了時間: {props.location.closingTime}
          </Typography>
          <Typography variant="body2" component="p">
            その他: {props.location.noteDisplay}
          </Typography>
          <Typography variant="body2" component="p">
            作成日時: {props.location.createdAtDisplay()}
          </Typography>
          <Typography variant="body2" component="p">
            更新日時: {props.location.updatedAtDisplay()}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Link href="/locations/[id]" as={`/locations/${props.location.id}`}>
          <Button color="primary" disabled>
            詳しく見る（未実装）
          </Button>
        </Link>
      </CardActions> */}
    </Card>
  );
};

export default LocationCard;
