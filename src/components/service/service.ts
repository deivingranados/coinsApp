export const coinsService = {
  GlobalCrypto: "https://api.coinlore.net/api/global/",
  TickersAll: "https://api.coinlore.net/api/tickers/",
  TickersSpecific: "https://api.coinlore.net/api/ticker/?id=",
  GetMarkets: "https://api.coinlore.net/api/coin/markets/?id=",
  AllExchanges: "https://api.coinlore.net/api/exchanges/",
  FetchExchange: "https://api.coinlore.net/api/exchange/",
  SocialStates: "https://api.coinlore.net/api/coin/social_stats/?id=",
  changuesSpecific: "https://api.coinlore.net/api/exchange/?id=2",
};

export const getGlobalCoins = async () => {
  return fetch(coinsService.GlobalCrypto).then((data) => data.json());
};

export const getCoins = async () => {
  return fetch(coinsService.TickersAll).then((data) => data.json());
};

export const getSelectedCoin = async (id: string) => {
  return fetch(coinsService.TickersSpecific + id).then((data) => data.json());
};

export const getSelectedMarkets = async (id: string) => {
  return fetch(coinsService.GetMarkets + id).then((data) => data.json());
};
export const getChangesCoins = async () => {
  return fetch(coinsService.AllExchanges).then((data) => data.json());
};

export const getSocialState = async (id: string) => {
  return fetch(coinsService.SocialStates + id).then((data) => data.json());
};

export const getChanguesSpecific = async (id: string) => {
  return fetch(coinsService.changuesSpecific + id).then((data) => data.json());
};
