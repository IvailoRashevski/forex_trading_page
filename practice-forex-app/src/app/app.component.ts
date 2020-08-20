import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  USD: number;
  AUD: number;
  CAD: number;
  BGN: number;
  refreshInterval: number;
  changeInterval: number;
  rate: boolean;
  rateGap = 0.0001;

  ngOnInit(): void {
    this.appService.getJSON().subscribe(data => {
      this.USD = Number(data.rates.USD.toFixed(4));
      this.AUD = Number(data.rates.AUD.toFixed(4));
      this.CAD = Number(data.rates.CAD.toFixed(4));
      this.BGN = Number(data.rates.BGN.toFixed(4));
    });
  }

  constructor(
    private readonly appService: AppService,
    ) {
    this.refreshInterval = window.setInterval(() => {
      if (this.rate) {
        this.USD = Number((this.USD + this.rateGap).toFixed(4));
        this.AUD = Number((this.AUD + this.rateGap).toFixed(4));
        this.CAD = Number((this.CAD + this.rateGap).toFixed(4));
        this.BGN = Number((this.BGN + this.rateGap).toFixed(4));
      } else {
        this.USD = Number((this.USD - this.rateGap).toFixed(4));
        this.AUD = Number((this.AUD - this.rateGap).toFixed(4));
        this.CAD = Number((this.CAD - this.rateGap).toFixed(4));
        this.BGN = Number((this.BGN - this.rateGap).toFixed(4));
      }
    }, 5000);
    this.changeInterval = window.setInterval(() => {
      this.rate = !this.rate;
    }, 60000);
    setTimeout(() => {
      clearInterval(this.refreshInterval);
      clearInterval(this.changeInterval);
    }, 300000);
  }
}
