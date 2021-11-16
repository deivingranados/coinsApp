import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Detailcoins from "../detailCoins/DetailsCoins";
import MarketCoins from "../marketCoins/MarketCoins";
import InformationCoins from "../InformationCoins/InformationCoins";
import CssBaseline from "@material-ui/core/CssBaseline";
import AllChangues from "../allchangues/AllChangues";
import SpecificChangues from "../allchangues/SpecificChangues";
import Navbar from "../navbar/navbar";

const Main = (): React.ReactElement => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={InformationCoins} />
        <Route exact path="/detailCoins" component={Detailcoins} />
        <Route exact path="/marketCoins" component={MarketCoins} />
        <Route exact path="/allChangues" component={AllChangues} />
        <Route exact path="/specificChangues" component={SpecificChangues} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Main;
