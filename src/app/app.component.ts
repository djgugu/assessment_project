import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CoinDetail } from './interfaces/coin-detail';
import { CoinsList } from './interfaces/coins-list';
import { CoinApiService } from './services/coin-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  search_name_text: string;
  search_symbol_text: string;
  search_text: string;
  search_item: string = 'name';
  sort_by: string = 'name';
  sort_type: string = 'ASC';
  sort_text_name: string = 'Aufsteigend sortiert nach Namen';
  sort_text_symbol: string = 'Aufsteigend sortiert nach Symbol';
  sort_text: string = 'Die Coins sind aufsteigend sortiert nach Namen';
  coins: CoinsList;
  preloader: boolean;
  selected_coin: CoinDetail;
  coin_detail_loader: boolean = false;
  constructor(private coin_service: CoinApiService) {}
  /**
   * load all coins. 
   * Shows Preloader
   */
  ngOnInit() {
    this.selected_coin = {
      symbol: '',
      name: '',
      categories: [],
      homepage: '',
      image: '',
      genesis_date: '',
      current_price: 0
    }
    this.preloader = true;
    this.coin_service.get_coins(false).subscribe((data) => {
      this.coins = data;
      this.preloader = false;
    });
  }
  /**
   * Get the coin detail
   * @param coinid 
   */
  get_coin_detail(coinid: number) {
    this.coin_detail_loader = true;
    this.coin_service.get_coin_detail(coinid).subscribe((data) => {
      this.coin_detail_loader = false;
      this.selected_coin = {
        symbol: data["symbol"],
        name: data["name"],
        categories: data["categories"],
        homepage: data["links"]["homepage"][0],
        image: data["image"]["thumb"],
        genesis_date: data["genesis_date"],
        current_price: data["market_data"]["current_price"]["eur"]
      }
    })
  }
  /**
   * Sort the list
   */
  sort_by_symbol() {
    this.sort_by = "symbol";
    if(this.sort_type == "ASC") {
      this.sort_type = "DESC";
      this.sort_text_symbol = 'Absteigend sortieren nach Symbol';
      this.sort_text = 'Die Coins sind aufsteigend sortiert nach Symbol';
    }else {
      this.sort_type = "ASC";
      this.sort_text_symbol = 'Aufsteigend sortieren nach Symbol';
      this.sort_text = 'Die Coins sind absteigend sortiert nach Symbol';
    }
  }
  sort_by_name() {
    this.sort_by = "name";
    if(this.sort_type == "ASC") {
      this.sort_type = "DESC";
      this.sort_text_name = 'Absteigend sortieren nach Namen';
      this.sort_text = 'Die Coins sind aufsteigend sortiert nach Namen';
    }else {
      this.sort_type = "ASC";
      this.sort_text_name = 'Aufsteigend sortieren nach Namen';
      this.sort_text = 'Die Coins sind absteigend sortiert nach Namen';
    }
  }
}
