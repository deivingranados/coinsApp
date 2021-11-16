import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InformationCoins from "./InformationCoins";
import { AppContext } from "../../context/context";
import * as Services from "../service/service";
import { StateType, CoinType } from "../../types/Types";

describe("InformationCoins", () => {
  const coinsList: CoinType[] = [
    {
      csupply: "18851540.00",
      id: "90",
      market_cap_usd: "1196493017385.90",
      msupply: "21000000",
      name: "Bitcoin",
      percent_change_1h: "0.00",
      percent_change_7d: "4.10",
      percent_change_24h: "0.01",
      price_btc: "1.00",
      price_usd: "63469.25",
      rank: 1,
      symbol: "BTC",
      tsupply: "18851540",
      volume24: 25499323371.301334,
      volume24a: 26975710470.6149,
      volume24_native: 0,
    },
  ];
  let state = {};
  const setState = (newState: StateType) => {
    state = { ...newState };
  };

  it("should call getSelectedCoin when a coin is selected", async () => {
    const getSelectedCoin = jest.spyOn(Services, "getSelectedCoin");
    setState({
      ...state,
      coinsList,
    });
    const { container } = render(
      <AppContext.Provider value={{ state, setState }}>
        <InformationCoins />
      </AppContext.Provider>
    );
    const coinActionList =
      container.getElementsByClassName("MuiButtonBase-root");
    const coinRow = coinActionList[0];
    await waitFor(() => {
      fireEvent.click(coinRow);
    });
    expect(getSelectedCoin).toHaveBeenCalledTimes(0);
  });

  it("should render information coin component whitout data", () => {
    render(<InformationCoins />);
    const noData = screen.getByText(/no data/i);
    expect(noData).toBeInTheDocument();
  });

  it("should render information coin component with data", () => {
    const getGlobalCoinsSpy = jest.spyOn(Services, "getGlobalCoins");
    const getCoinsSpy = jest.spyOn(Services, "getCoins");
    const { container } = render(<InformationCoins />);
    const resultContainer = container.getElementsByClassName("content_coins");
    expect(!!resultContainer).toBeTruthy();
    expect(getGlobalCoinsSpy).toHaveBeenCalledTimes(1);
    expect(getCoinsSpy).toHaveBeenCalledTimes(1);
  });
});
