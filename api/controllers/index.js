// tools.js
// ========
const https = require('https');

module.exports = {
    url : 'https://api.mercadolibre.com/',

    orderData: function (json, from,description) {
        json = JSON.parse(json);
        let finalJson = {};
        let items, categories = '';

        switch (from) {
            case 1:
            case "1":
                items = json.results;
                categories = json.filters[0] !== undefined ? json.filters[0].values[0].path_from_root: 'Sin categorias';
                break;
            case 2:
            case "2":
                items = json;
                categories = '';
                break;
        }


        finalJson = {
            author: {
                name: 'Pablo',
                lastname: 'De Cecco'
            },
            categories: categories,
            items: this.resultsSearch(items,from,description)
        };

        return finalJson;
    },

    resultsSearch: function (jsonAux, from,description) {        
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
            objectAux.picture = from===2 ? json[index].pictures[0].url : json[index].thumbnail;
            objectAux.condition = json[index].condition;            
            objectAux.free_shipping = json[index].shipping == undefined ? false : json[index].shipping['free_shipping'];
            objectAux.amount = json[index].price;
            objectAux.currency = json[index].currency_id;
            objectAux.decimals = '00';
            priceAux.amount = json[index].price;
            priceAux.currency = json[index].currency_id;
            priceAux.decimals = '00';
            objectAux.price = priceAux;
            objectAux.sold_quantity = json[index].sold_quantity;
            objectAux.description = description;   
            objectAux.state = json[index].address == undefined ? 'Provincia' : json[index].address.state_name;            
            arrayAux.push(objectAux);            
        }
        return arrayAux;

    },
    apiCalls: function(id){
           
        https.get('https://api.mercadolibre.com/'+id, (resp) => {
            let data = '';
    
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;                
            });
    
            // The whole response has been received. Print out the result.
            resp.on('end', () => {            
                let json = JSON.parse(data)
                
                
                // console.log('busco: ' + data);                                        
                return json.plain_text;
            });
    
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}; 
var zemba = function () {
}