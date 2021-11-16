import React from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../context/context";
import { getSelectedMarkets, getSocialState } from "../service/service";
import ModalSocialState from "./ModalSocialState";
import Button from "@material-ui/core/Button";
import { Line } from "react-chartjs-2";
import { red } from "@material-ui/core/colors";

import "../detailCoins/details.css";

const DetailCoins = () => {
  const history = useHistory();
  const { state, setState } = useAppContext();
  const { selectedCoin } = state;

  const data = {
    labels: ["1H", "12h", "24H", "1D", "3D", "7D"],
    datasets: [
      {
        label: "PERCENT",
        data: [
          selectedCoin ? selectedCoin.percent_change_1h : null,
          0.2,
          selectedCoin ? selectedCoin.percent_change_24h : null,
          0.3,
          0.5,
          selectedCoin ? selectedCoin.percent_change_7d : null,
        ],
        fill: false,
        borderColor: "#52BE80",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleMarketClick = () => {
    if (selectedCoin) {
      getSelectedMarkets(selectedCoin.id).then((markets) => {
        setState({
          ...state,
          selectedMarket: markets,
        });
        history.push("/marketCoins");
      });
    }
  };

  const handleStateClick = () => {
    if (selectedCoin) {
      getSocialState(selectedCoin.id).then((stateData) => {
        setState({
          ...state,
          selectedState: stateData.twitter,
          selectedStateReddit: stateData.reddit,
        });
      });
    }
  };

  return selectedCoin ? (
    <div className="content_all">
      <div className="content_card">
        <h6 className="title">BTC Price and Market Stats</h6>
        <div className="box_text">
          <label className="title_text">{selectedCoin.name}/Price</label>
          <div className="text_coins">${selectedCoin.price_usd}</div>
        </div>
        <div className="box_text">
          <label className="title_text">Market Cap</label>
          <div className="text_coins">${selectedCoin.market_cap_usd}</div>
        </div>
        <div className="box_text">
          <label className="title_text">Market Cap Dominance</label>
          <div className="text_coins">40.94%</div>
        </div>
        <div className="box_text">
          <label className="title_text">Trading Volume</label>
          <div className="text_coins">${selectedCoin.volume24}</div>
        </div>
        <div className="box_text">
          <label className="title_text">Volume / Market Cap</label>
          <div className="text_coins">{selectedCoin.percent_change_24h}</div>
        </div>
        <div className="box_text">
          <label className="title_text">24h Low / 24h High</label>
          <div className="text_coins">
            ${selectedCoin.volume24}/{selectedCoin.price_usd}
          </div>
        </div>
        <div className="box_text">
          <label className="title_text">7d Low / 7d High</label>
          <div className="text_coins">
            {selectedCoin.volume24_native}/{selectedCoin.price_usd}
          </div>
        </div>
        <div className="box_text">
          <label className="title_text">Market Cap Rank</label>
          <div className="text_coins">#{selectedCoin.rank}</div>
        </div>
        <div className="box_text">
          <label className="title_text">1H</label>
          <div className="text_coins">{selectedCoin.percent_change_1h}%</div>
        </div>
        <div className="box_text">
          <label className="title_text">24H</label>
          <div className="text_coins">{selectedCoin.percent_change_24h}%</div>
        </div>
        <div className="box_text">
          <label className="title_text">7D</label>
          <div className="text_coins">{selectedCoin.percent_change_7d}%</div>
        </div>
        <div className="box_text">
          <label className="title_text">All-Time High</label>
          <div className="text_coins">${selectedCoin.price_usd}</div>
        </div>
      </div>
      <div className="content_line">
        <Line data={data} options={options} />
        <div className="content_buttons">
          <div className="content_button">
            <Button
              className="market_btn"
              variant="contained"
              style={{ backgroundColor: red[500], color: "white" }}
              disableElevation
              onClick={handleMarketClick}
            >
              Markets for specific coin
            </Button>
          </div>
          <div className="content_button_3">
            <ModalSocialState handleState={handleStateClick} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No coins selected</div>
  );
};

export default DetailCoins;
