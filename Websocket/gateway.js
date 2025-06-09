const WebSocket = require('ws');
const FinnhubConnector = require('./connector');

function startGateway(server) {
    const wss = new WebSocket.Server({ server });
    const finnhub = new FinnhubConnector();

    wss.on('connection', (client) => {
        console.log('Client connected');

        // Handler to send trade data to this client
        const handleTrade = (data) => {
            client.send(JSON.stringify(data));
        };

        finnhub.on('trade', handleTrade);

        client.on('close', () => {
            console.log('Client disconnected');
            finnhub.off('trade', handleTrade);
        });

        client.on('message', (msg) => {
            try {
                const parsed = JSON.parse(msg);
                if (parsed.type === 'subscribe') {
                    finnhub.subscribe(parsed.symbol);
                } else if (parsed.type === 'unsubscribe') {
                    finnhub.unsubscribe(parsed.symbol);
                }
            } catch (err) {
                console.error('Invalid client message:', msg);
            }
        });
    });
}

module.exports = startGateway;
