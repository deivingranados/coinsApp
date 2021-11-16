import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import DetailCoins from "./DetailsCoins";
import { AppContext } from "../../context/context";

import * as Services from "../service/service";
import { StateType, CoinType } from "../../types/Types";

describe("DetailsCoins", () => {
  const selectedCoin: CoinType = {
    csupply: "18851540.00",
    id: "90",
    market_cap_usd: "1218072182046.80",
    msupply: "21000000",
    name: "Bitcoin",
    percent_change_1h: "1.80",
    percent_change_7d: "5.48",
    percent_change_24h: "2.33",
    price_btc: "1.00",
    price_usd: "64613.94",
    rank: 1,
    symbol: "BTC",
    tsupply: "18851540",
    volume24: 24183013942.72,
    volume24_native: 374269.33,
    volume24a: 374269.33,
  };

  let state = {};
  const setState = (newState: StateType) => {
    state = { ...newState };
  };

  it("should render coin details an call getSelectedMarkets", async () => {
    setState({
      ...state,
      selectedCoin,
    });
    const getSelectedMarketsSpy = jest.spyOn(Services, "getSelectedMarkets");
    const { container } = render(
      <AppContext.Provider value={{ state, setState }}>
        <DetailCoins />
      </AppContext.Provider>
    );

    const marketActList = container.getElementsByClassName("market_btn");
    const marketBtn = marketActList[0];
    await waitFor(() => {
      fireEvent.click(marketBtn);
    });
    expect(getSelectedMarketsSpy).toHaveBeenCalledTimes(1);
  });

  it("should render coin details an call getSocialState", async () => {
    setState({
      ...state,
      selectedCoin,
    });
    const getSocialStateSpy = jest.spyOn(Services, "getSocialState");
    render(
      <AppContext.Provider value={{ state, setState }}>
        <DetailCoins />
      </AppContext.Provider>
    );

    const socialBtn = screen.getByText(/social stats for coin/i);
    await waitFor(() => {
      fireEvent.click(socialBtn);
    });
    expect(getSocialStateSpy).toHaveBeenCalledTimes(1);
  });

  it("should render coin details component with data", async () => {
    setState({
      ...state,
      selectedCoin,
    });
    render(
      <AppContext.Provider value={{ state, setState }}>
        <DetailCoins />
      </AppContext.Provider>
    );

    const title = screen.getByText(/BTC Price and Market Stats/i);
    expect(title).toBeInTheDocument();
  });

  it("should render component whitout data", () => {
    render(<DetailCoins />);
    const noData = screen.getByText(/No coins selected/i);
    expect(noData).toBeInTheDocument();
  });
});
