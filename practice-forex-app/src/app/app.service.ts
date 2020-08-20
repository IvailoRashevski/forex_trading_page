import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private localJSON = '../assets/currencies.json';

  constructor(
    private readonly http: HttpClient,
  ) {}

  public getJSON(): Observable<any> {
    return this.http.get(this.localJSON);
  }
}
