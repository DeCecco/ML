import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  route = 'https://api.mercadolibre.com/sites/MLA/';
  routeId = 'https://api.mercadolibre.com/items/';
  newRoute = 'http://localhost:3000/api/';
  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor(private http: HttpClient) { }

  searchApi(text) {
    return this.http.get(this.newRoute + '?where=1&data=' + text).toPromise().then(data => this.orderData(data, 1));
  }
  
  detail(id) {
    return this.http.get(this.newRoute + '?where=2&data=' + id).toPromise().then(data => this.orderData(data, 0));
  }


  descriptionId(id) {
    return this.http.get(this.newRoute + '?where=3&data=' + id).toPromise().then(data => data);
  }

  orderData(json, from) {
    console.info(json)
    let finalJson = {};
    finalJson = {
      author: {
        name: 'Pablo',
        lastname: 'De Cecco'
      },
      categories: from === 1 ? json.filters[0] !== undefined ? json.filters[0].values : 'Sin categorias' : '',
      items: this.resultsSearch(from === 1 ? json.results : json)
    };
    return finalJson;
  }
  resultsSearch(jsonAux) {
    console.info(json);
    const arrayAux = [];
    let json = [];
    let lenght = 1;
    if (typeof jsonAux.length === 'number') {
      lenght = jsonAux.length;
      json = jsonAux;
    } else {
      json.push(jsonAux);
    }

    for (let index = 0; index < lenght; index++) {
      const objectAux = {};
      const priceAux = {};
      objectAux.id = json[index].id;
      objectAux.title = json[index].title;
      objectAux.picture = json[index].thumbnail;
      objectAux.condition = json[index].condition;
      objectAux.free_shipping = json[index].shipping['free_shipping'];
      objectAux.amount = json[index].price;
      objectAux.currency = json[index].currency_id;
      objectAux.decimals = '00';
      priceAux.amount = json[index].price;
      priceAux.currency = json[index].currency_id;
      priceAux.decimals = '00';
      objectAux.price = priceAux;
      objectAux.sold_quantity = json[index].sold_quantity;
      objectAux.description = '';
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
