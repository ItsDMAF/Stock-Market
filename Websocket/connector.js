require('dotenv').config();
const WebSocket = require('ws');
const EventEmitter = require('events');

const stockSymbols = [
  'AAPL',  // Apple
  'MSFT',  // Microsoft
  'GOOGL', // Alphabet (Google)
  'AMZN',  // Amazon
  'META',  // Meta (Facebook)
  'TSLA',  // Tesla
  'NVDA',  // NVIDIA
  'BRK.B', // Berkshire Hathaway
  'JNJ',   // Johnson & Johnson
  'V',     // Visa
  'JPM',   // JPMorgan Chase
  'PG',    // Procter & Gamble
  'MA',    // Mastercard
  'UNH',   // UnitedHealth
  'HD',    // Home Depot
  'XOM',   // ExxonMobil
  'CVX',   // Chevron
  'BAC',   // Bank of America
  'PFE',   // Pfizer
  'KO',    // Coca-Cola
  'PEP',   // PepsiCo
  'DIS',   // Disney
  'ABBV',  // AbbVie
  'NFLX',  // Netflix
  'T',     // AT&T
  'INTC',  // Intel
  'MRK',   // Merck
  'CSCO',  // Cisco
  'WMT',   // Walmart
  'BA',    // Boeing
  'ORCL',  // Oracle
  'COST',  // Costco
  'MCD',   // McDonald's
  'DHR',   // Danaher
  'CRM',   // Salesforce
  'NKE',   // Nike
  'WFC',   // Wells Fargo
  'TMO',   // Thermo Fisher
  'TXN',   // Texas Instruments
  'QCOM',  // Qualcomm
  'UPS',   // UPS
  'AMAT',  // Applied Materials
  'MDT',   // Medtronic
  'GS',    // Goldman Sachs
  'C',     // Citigroup
  'GE',    // General Electric
  'HON',   // Honeywell
  'ADP',   // ADP
  'IBM',   // IBM
  'LMT'    // Lockheed Martin
];
class FinnhubConnector extends EventEmitter {
    constructor() {
        super();
        this.socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINHUB_KEY}`);

        this.socket.on('open', () => {
            console.log('Connected to Finnhub');
            stockSymbols.forEach((symbol) => {
                this.subscribe(symbol);
            })
        });

        this.socket.on('message', (event) => {
            const message = JSON.parse(event.toString());
            if (message.type === 'trade') {
                this.emit('trade', message);
            }
            console.log(message);
        });

        this.socket.on('error', (err) => {
            console.error('Finnhub error:', err);
        });
    }

    subscribe(symbol) {
        const msg = JSON.stringify({ type: 'subscribe', symbol });
        this._sendWhenReady(msg);
    }

    unsubscribe(symbol) {
        const msg = JSON.stringify({ type: 'unsubscribe', symbol });
        this._sendWhenReady(msg);
    }

    _sendWhenReady(msg) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(msg);
        } else {
            this.socket.once('open', () => this.socket.send(msg));
        }
    }
}

module.exports = FinnhubConnector;
