const request = require('request');
const http = require('http');
const crypto = require('./cryptoCoin.js');

let coin_list = undefined;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (coin_list) {
        res.end(JSON.stringify(coin_list))
    }
    else {
        res.end('No data')
    }
}).listen(8080);

request({
    method: 'GET',
    uri: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 5000,
        convert: 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'f412702c-a1ce-4d75-8c0d-e8832982248c'
    },
}, (err, req_res, body) => {
    if (err) throw err;

    coin_data = JSON.parse(body);
    coin_list = []
    coin_data['data'].forEach((coin) => {
        coin_list.push(new crypto.CryptoCoin(coin.id, coin.name, coin.symbol, coin.quote.USD.price));
        // console.log(coin.id, coin.name, coin.symbol, coin.quote.USD.price)
    });
});