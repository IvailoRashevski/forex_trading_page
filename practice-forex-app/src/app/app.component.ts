import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  rate: boolean;
  USD: number;
  AUD: number;
  CAD: number;
  BGN: number;
  refreshInterval: number;
  changeInterval: number;
  rateGap = 0.0001;
  decimalToDisplay = 4;
  refreshIntervalTime = 5000;
  changeIntervalTime = 60000;
  stopUpdateRateTime = 300000;

  ngOnInit(): void {
    this.appService.getJSON().subscribe(data => {
      this.USD = Number(data.rates.USD.toFixed(this.decimalToDisplay));
      this.AUD = Number(data.rates.AUD.toFixed(this.decimalToDisplay));
      this.CAD = Number(data.rates.CAD.toFixed(this.decimalToDisplay));
      this.BGN = Number(data.rates.BGN.toFixed(this.decimalToDisplay));
    });
  }

  constructor(
    private readonly appService: AppService,
    ) {
    this.refreshInterval = window.setInterval(() => {
      if (this.rate) {
        this.USD = Number((this.USD + this.rateGap).toFixed(this.decimalToDisplay));
        this.AUD = Number((this.AUD + this.rateGap).toFixed(this.decimalToDisplay));
        this.CAD = Number((this.CAD + this.rateGap).toFixed(this.decimalToDisplay));
        this.BGN = Number((this.BGN + this.rateGap).toFixed(this.decimalToDisplay));
      } else {
        this.USD = Number((this.USD - this.rateGap).toFixed(this.decimalToDisplay));
        this.AUD = Number((this.AUD - this.rateGap).toFixed(this.decimalToDisplay));
        this.CAD = Number((this.CAD - this.rateGap).toFixed(this.decimalToDisplay));
        this.BGN = Number((this.BGN - this.rateGap).toFixed(this.decimalToDisplay));
      }
    }, this.refreshIntervalTime);
    this.changeInterval = window.setInterval(() => {
      this.rate = !this.rate;
    }, this.changeIntervalTime);
    setTimeout(() => {
      clearInterval(this.refreshInterval);
      clearInterval(this.changeInterval);
    }, this.stopUpdateRateTime);
  }
}
