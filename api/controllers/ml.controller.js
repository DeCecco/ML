
var express = require('express');
var app = express();
const https = require('https');
const path = require('path');

// respond with "hello world" when a GET request is made to the homepage
// npm run dev


const mlCtrl = {}
const url = 'https://api.mercadolibre.com/';

mlCtrl.searchQuery = (req, res) => {
    console.log(req);
    res.send({
        status: 'Api Works'
    });
}

mlCtrl.getId = function (id, error) {
    console.info('asd')

}
mlCtrl.getId2 = async (request, response) => {
    console.log(request);
    response.json('received')
}

mlCtrl.searchQueryP = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log(req.query);
    let from = req.query.where;
    switch (req.query.where) {
        case 1:
        case '1': api = 'sites/MLA/search?q=' + req.query.data + '&limit=4';
            break;
        case 2:
        case '2': api = 'items/' + req.query.data;
            break;
        case 3:
        case '3': api = 'items/' + req.query.data + '/description';
            break;
        default: api = 'sites/MLA/search?q=' + req.query.data + '&limit=4';
            break;
    }
    // const data = mlCtrl.test(req.body.text);
    https.get(url + api, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
            // console.info('data' + data)
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.info('resp' + resp)

            // console.log('busco: ' + data);
            const x = this.orderData(json)
            
            res.json(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });



}
function orderData(json, from) {
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
  
function resultsSearch(jsonAux) {
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
          console.info('shippingshipping')
          console.info(json[index])
          console.info(json[index].shipping)
          objectAux.id = json[index].id;
          objectAux.title = json[index].title;
          objectAux.picture = json[index].thumbnail;
          objectAux.condition = json[index].condition;
          objectAux.free_shipping = json[index].shipping['free_shipping'] == undefined ? false : json[index].shipping['free_shipping'];
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

mlCtrl.test = function (req, res) {
    https.get('https://api.mercadolibre.com/sites/MLA/search?q=' + req + '&limit=4', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
            // console.info('data' + data)
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.info('resp' + resp)
            console.info('me llego: ' + req)
            // console.log('busco: ' + data);
            return data;
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}


module.exports = mlCtrl;