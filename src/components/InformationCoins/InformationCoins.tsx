import React, { useEffect, ReactElement } from "react";
import MaterialTable from "material-table";
import { getGlobalCoins, getCoins, getSelectedCoin } from "../service/service";
import { useHistory } from "react-router-dom";
import { CoinGlobalType, CoinType } from "../../types/Types";
import { useAppContext } from "../../context/context";
import { Button } from "@material-ui/core/";
import { yellow } from "@material-ui/core/colors";

import "../InformationCoins/information.css";

const InformationCoins = (): ReactElement => {
  const history = useHistory();
  const [listGlobal, setListGlobal] = React.useState<CoinGlobalType[]>();
  const { state, setState } = useAppContext();
  const { coinsList } = state;

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";
  const numeric: IType = "numeric";

  const columns = [
    {
      title: "Csupply",
      field: "csupply",
      type: string,
    },
    {
      title: "Market cap usd",
      field: "market_cap_usd",
      type: string,
    },
    {
      title: "Msupply",
      field: "msupply",
      type: string,
    },
    {
      title: "Name",
      field: "name",
      type: string,
    },

    {
      title: "1h",
      field: "percent_change_1h",
      type: string,
    },
    {
      title: "7d",
      field: "percent_change_7d",
      type: string,
    },
    {
      title: "24h",
      field: "percent_change_24h",
      type: string,
    },
    {
      title: "Price",
      field: "price_usd",
      type: string,
    },
    {
      title: "Rank",
      field: "rank",
      type: numeric,
    },
    {
      title: "Symbol",
      field: "symbol",
      type: string,
    },
  ];

  const handleRowClick = (coin: CoinType | CoinType[]) => {
    if (!Array.isArray(coin)) {
      getSelectedCoin(coin.id).then((result) => {
        setState({
          ...state,
          selectedCoin: result[0],
        });

        history.push("/detailCoins");
      });
    }
  };

  useEffect(() => {
    getGlobalCoins().then((items) => {
      setListGlobal(items);
    });
  }, []);

  useEffect(() => {
    if (!coinsList) {
      getCoins().then((result) => {
        setState({
          ...state,
          coinsList: result.data,
        });
      });
    }
  }, [coinsList, setState, state]);

  return (
    <div className="content">
      {listGlobal ? (
        listGlobal.map((item: CoinGlobalType) => {
          return (
            <div className="content_coins" key={item.id}>
              <div className="content_text">
                <p className="text_title">Cryptocurrencies:</p>
                <p className="text_indication">{item.coins_count}</p>
              </div>
              <div className="content_text">
                <p className="text_title">Markets:</p>
                <p className="text_indication">{item.active_markets}</p>
              </div>
              <div className="content_text">
                <p className="text_title">Market Cap:</p>
                <p className="text_indication">{item.mcap_ath}</p>
              </div>
              <div className="content_text">
                <p className="text_title">24h Vol:</p>
                <p className="text_indication">{item.total_volume}</p>
              </div>
              <div className="content_text">
                <p className="text_title">BTC Dominance:</p>
                <p className="text_indication">{item.total_mcap}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h2>no data</h2>
      )}
      <div className="content_table">
        <MaterialTable
          title="Information about all coins"
          columns={columns}
          data={coinsList || []}
          actions={[
            {
              icon: "add",
              tooltip: "Detail coins",
              onClick: (event, rowData) => handleRowClick(rowData),
            },
          ]}
          options={{
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
            pageSize: 10,
          }}
          components={{
            Action: (props) => (
              <Button
                onClick={(event) => props.action.onClick(event, props.data)}
                color="primary"
                variant="contained"
                style={{ backgroundColor: yellow[700], color: "white" }}
                size="small"
              >
                Details
              </Button>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default InformationCoins;
