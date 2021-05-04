import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoinsList } from '../interfaces/coins-list';

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {
  readonly ROOT_URL = "https://api.coingecko.com/api/v3";
  constructor(private http: HttpClient) { }
    /**
   * List all supported coins id, name and symbol (no pagination required)
   * @param include_platform 
   * @returns An Observable
   */
    get_coins(include_platform: boolean) {
      return this.http.get<CoinsList>(this.ROOT_URL+"/coins/list?include_platform="+include_platform);
    }
    /**
     * Get Coin detail 
     * @param coinid 
     * @returns An Observable 
     */
    get_coin_detail(coinid: number) {
      return this.http.get(this.ROOT_URL+"/coins/"+coinid+"?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
    }
}
