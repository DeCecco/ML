
var express = require('express');
var app = express();
const https = require('https');

// respond with "hello world" when a GET request is made to the homepage



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
            res.json(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });



}
const router = express.Router();

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