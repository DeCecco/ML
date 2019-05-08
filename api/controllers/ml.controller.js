var express = require('express');
var app = express();
const https = require('https');
const path = require('path');
var tools = require('./index.js')

// npm run dev

const mlCtrl = {}
const url = 'https://api.mercadolibre.com/';

mlCtrl.getId = function (req, res) {    
    console.info();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    let api = 'items/' + req.params.id;
 
    
    // const data = mlCtrl.test(req.body.text);
    https.get(url + api, (resp) => {
        let firstJson = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            firstJson += chunk;
            // console.info('data' + data)
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.info('resp' + resp)
            https.get(url + api +'/description', (resp) => {
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
                    let json = JSON.parse(data)
            
            
                    // console.log('busco: ' + data);                                        
                    res.json(tools.orderData(firstJson, 2,json.plain_text));
                });
        
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
            // console.log('busco: ' + data);                      
            
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}
mlCtrl.searchQueryP = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    let api = 'sites/MLA/search?q=' + req.query.q + '&limit=4';
 
    
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
            res.json(tools.orderData(data, 1,''));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports = mlCtrl;