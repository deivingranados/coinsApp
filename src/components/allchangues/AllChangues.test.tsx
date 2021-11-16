import { render, fireEvent, waitFor } from "@testing-library/react";
import * as Services from "../service/service";
import AllChangues from "./AllChangues";
import { AppContext } from "../../context/context";
import { StateType, ChangeType } from "../../types/Types";

describe("DetailsCoins", () => {
  const changesCoins: ChangeType[] = [
    {
      id: "5",
      name: "Binance",
      btc_d: "binance",
      name_id: "binance",
      volume_usd: 760553951.4576122760772705078125,
      active_pairs: 399,
      url: "https:www.binance.com",
      country: "Japan",
    },
  ];

  let state = {};
  const setState = (newState: StateType) => {
    state = { ...newState };
  };

  it("should render coin details component with data", async () => {
    setState({
      ...state,
      changesCoins,
    });
    const { container } = render(
      <AppContext.Provider value={{ state, setState }}>
        <AllChangues />
      </AppContext.Provider>
    );

    const marketActListComponent =
      container.getElementsByClassName("content_table");
    expect(marketActListComponent).toBeTruthy();
  });

  it("should call getChanguesSpecific when a coin is selected", async () => {
    const getChanguesSpecific = jest.spyOn(Services, "getChanguesSpecific");
    setState({
      ...state,
      changesCoins,
    });
    const { container } = render(
      <AppContext.Provider value={{ state, setState }}>
        <AllChangues />
      </AppContext.Provider>
    );
    const coinActionList =
      container.getElementsByClassName("MuiButtonBase-root");
    const coinRow = coinActionList[0];
    await waitFor(() => {
      fireEvent.click(coinRow);
    });
    expect(getChanguesSpecific).toHaveBeenCalledTimes(0);
  });
});
