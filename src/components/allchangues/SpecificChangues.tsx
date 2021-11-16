import React from "react";
import { useAppContext } from "../../context/context";
import Card from "@material-ui/core/Card";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 10,
      marginLeft: 0,
    },
  })
);

const SpecificChangues = () => {
  const classes = useStyles();
  const { state } = useAppContext();
  const { selectedSpecificChangue } = state;

  return (
    <div className="row row-cols-2 row-cols-sm-4">
      {selectedSpecificChangue?.map((item) => {
        return (
          <div>
            <Card className={classes.root} key={item.base}>
              <div className="content_cardMarket">
                <div className="box_text_market">
                  <label className="title_text">Base:</label>
                  <div className="text_coins">{item.base}</div>
                </div>
                <div className="box_text_market">
                  <label className="title_text">quote:</label>
                  <div className="text_coins">${item.quote}</div>
                </div>
                <div className="box_text_market">
                  <label className="title_text">Price usd:</label>
                  <div className="text_coins">${item.price_usd}</div>
                </div>
                <div className="box_text_market">
                  <label className="title_text">Time:</label>
                  <div className="text_coins">{item.time}</div>
                </div>
                <div className="box_text_market">
                  <label className="title_text">volume:</label>
                  <label className="text_coins">{item.volume}</label>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SpecificChangues;
