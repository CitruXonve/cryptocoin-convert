const request = require('request');
const http = require('http');

let coin_data = undefined;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if(coin_data) {
        res.end(coin_data)
    }
    else{
        res.end('No data')
    }
}).listen(8080);

request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', (err, req_res, body) => {
    if(err) throw err;

    coin_data=body;
});