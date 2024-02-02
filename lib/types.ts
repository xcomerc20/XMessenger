export type TokenBalance = {
  token: {
    address: string;
    circulating_market_cap: string;
    decimals: string;
    exchange_rate: string;
    holders: string;
    icon_url: string;
    name: string;
    symbol: string;
    total_supply: string;
    type: string;
  };
  token_id: any;
  token_instance: any;
  value: string;
};

export interface IMessage {
  r: boolean;
  c: string;
  s: string;
  t: { _seconds: number; _nanoseconds: number };
  m: string;
  id: string;
  type?: "temp";
}
