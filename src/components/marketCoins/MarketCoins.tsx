import React, { ReactElement } from "react";
import { useAppContext } from "../../context/context";
import Card from "@material-ui/core/Card";
import ChildrenMarket from "../marketCoins/ChildrenMarket";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarketType } from "../../types/Types";
import "./market.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 10,
      marginLeft: 0,
    },
  })
);

const MarketCoins = (): ReactElement => {
  const classes = useStyles();
  const { state } = useAppContext();
  const { selectedMarket } = state;

  return (
    <div className="container">
      <h4 className="title_market"> MARKETS FOR SPECIFIC COIN</h4>
      <div className="row row-cols-2 row-cols-sm-4">
        {selectedMarket ? (
          selectedMarket.map((market: MarketType) => {
            return (
              <Card className={classes.root} key={market.name}>
                <ChildrenMarket listText={market} />
              </Card>
            );
          })
        ) : (
          <div>No coins selected</div>
        )}
      </div>
    </div>
  );
};

export default MarketCoins;
