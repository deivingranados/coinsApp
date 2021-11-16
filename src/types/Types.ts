export interface AppContextType {
  state: StateType;
  setState: (state: StateType) => void;
}

export interface CoinType {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
  volume24_native: number;
}

export interface CoinGlobalType {
  id: number;
  active_markets: number;
  avg_change_percent: string;
  btc_d: string;
  coins_count: number;
  eth_d: string;
  mcap_ath: number;
  mcap_change: string;
  total_mcap: number;
  total_volume: number;
  volume_ath: number;
  volume_change: string;
}

export interface MarketType {
  name: string;
  base: string;
  quote: string;
  price: number;
  price_usd: number;
  volume: number;
  volume_usd: number;
  time: number;
}

export interface ChangeType {
  id: string;
  name: string;
  btc_d: string;
  name_id: string;
  volume_usd: number;
  active_pairs: number;
  url: string;
  country: string;
}

export interface SocialStateType {
  followers_count: number;
  status_count: number;
  avg_active_users: number;
  subscribers: number;
}

export interface ChanguesSpecific {
  base: string;
  quote: string;
  volume: number;
  price: number;
  price_usd: number;
  time: number;
}

export interface StateType {
  coinsList?: CoinType[];
  selectedCoin?: CoinType;
  selectedMarket?: MarketType[];
  changesCoins?: ChangeType[];
  selectedState?: SocialStateType;
  selectedStateReddit?: SocialStateType;
  selectedSpecificChangue?: ChanguesSpecific[];
}
