exports.CryptoCoin = class {
    constructor(id, name, sym, usd_price) {
        this.id = id;
        this.name = name;
        this.sym = sym;
        this.usd_price = usd_price;
    }

    convert_price_to(another_coin) {
        return this.usd_price / another_coin.usd_price;
    }
}