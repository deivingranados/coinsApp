import { render, screen } from "@testing-library/react";

import MarketCoins from "./MarketCoins";
import { AppContext } from "../../context/context";
import { StateType, MarketType } from "../../types/Types";

describe("DetailsCoins", () => {
  const selectedMarket: MarketType[] = [
    {
      name: "BitForex",
      base: "BTC",
      quote: "USDT",
      price: 3989.63999999999987267074175179004669189453125,
      price_usd: 3989.63999999999987267074175179004669189453125,
      volume: 75308.241800000003422610461711883544921875,
      volume_usd: 300452773.81494998931884765625,
      time: 1553386202,
    },
  ];

  let state = {};
  const setState = (newState: StateType) => {
    state = { ...newState };
  };

  it("should render coin details component with data", async () => {
    setState({
      ...state,
      selectedMarket,
    });
    const { container } = render(
      <AppContext.Provider value={{ state, setState }}>
        <MarketCoins />
      </AppContext.Provider>
    );

    const marketActListComponent =
      container.getElementsByClassName("content_cardMarket");
    expect(marketActListComponent).toBeTruthy();
  });

  it("should render component whitout data", () => {
    render(<MarketCoins />);
    const noData = screen.getByText(/No coins selected/i);
    expect(noData).toBeInTheDocument();
  });
});
