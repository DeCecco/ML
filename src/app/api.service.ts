import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface JsonObjectAux {
  id: string;
  title: string;
  picture: string;
  condition: string;
  free_shipping: string;
  amount: string;
  currency: string;
  decimals: string;
  price: {};
  sold_quantity: string;
  description: string;
}
export interface JsonPriceAux {
  amount: string;
  currency: string;
  decimals: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  newRoute = 'http://localhost:3000/api/';
  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor(private http: HttpClient) { }

  searchApi(text) {
    return this.http.get(this.newRoute + 'items?q=' + text).toPromise().then(data => data);
  }

  detail(id) {
    return this.http.get(this.newRoute + 'items/' + id).toPromise().then(data => data);
  }
  changeCategory(cat) {
    this.change.emit(cat);
  }
}
