import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  route = 'https://api.mercadolibre.com/sites/MLA/';
  routeId = 'https://api.mercadolibre.com/items/';
  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor(private http: HttpClient) { }

  search(text) {
    return this.http.get(this.route + 'search?q=' + text + '&limit=4').toPromise().then(data => this.orderData(data));
  }
  detail(id) {
    return this.http.get(this.routeId + id).toPromise().then(data => data);
  }

  orderData(json) {
    let finalJson = {};
    finalJson = {
      author: {
        name: 'Pablo',
        lastname: 'De Cecco'
      },
      categories: json.filters[0] !== undefined ? json.filters[0].values : 'Sin categorias',
      items: this.resultsSearch(json.results)
    };
    return finalJson;
  }
  resultsSearch(json) {
    const arrayAux = [];
    for (let index = 0; index < json.length; index++) {
      const objectAux = {};
      const priceAux = {};
      objectAux.id = json[index].id;
      objectAux.title = json[index].title;
      objectAux.picture = json[index].thumbnail;
      objectAux.condition = json[index].condition;
      objectAux.free_shipping = json[index].shipping['free_shipping'];
      objectAux.amount = json[index].price;
      objectAux.currency = json[index].currency_id;
      objectAux.decimals = json[index].amount;
      //objectAux.price = priceAux;
      arrayAux.push(objectAux);
    }
    return arrayAux;
  }
  getFraction(n) {
    const s = String(n);
    return s.slice(s.indexOf('.'));
  }

  middle(data) {
    this.change.emit(data);
  }
}
