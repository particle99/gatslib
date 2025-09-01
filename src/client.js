const { World } = require("./World/world");

const { Codec } = require("./Network/codec");
const { Network } = require("./Network/network");

const { WebSocket } = require("ws");

const { SocksProxyAgent } = require("socks-proxy-agent");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { HttpProxyAgent } = require("http-proxy-agent");

class Client {
    constructor(server, opts, captcha) {
        this.server = server;
        this.opts = opts;
        this.captcha = captcha; //make sure this is defined BEFORE creating a client

        this.codec = new Codec(this);
        this.world = new World(this);
        this.network = new Network(this);

        this.hostname = this.server.hostname;
        this.host = this.server.host;
        this.socket = null;

        this.connected = false;
    }

    connect() {
        if(!this.hostname) {
            this.opts.DEBUG_ENABLED && console.log(`[Client.connect] Hostname is not defined before creating the game socket`);
            return;
        }

        if(!this.host) {
            this.opts.DEBUG_ENABLED && console.log(`[Client.connect] Host is not defined before creating the game socket`);
            return;
        }

        if(this.connected) {
            this.opts.DEBUG_ENABLED && console.log(`[Client.connect] Socket is already connected`);
            return;
        }

        if(this.opts.USE_PROXY) {
            if(this.opts.PROXY_PROTOCOL == null || this.opts.PROXY_URL == null) {
                this.opts.DEBUG_ENABLED && console.log(`[Client.createSocket] Use proxy set to true, but proxy protocol or proxy url are not set`);
                return;
            } else {
                this.proxy = null;

                try {
                    switch(this.opts.PROXY_PROTOCOL) {
                        case "socks5":
                            this.proxy = new SocksProxyAgent(`socks://${this.opts.PROXY_URL}`);
                            break;
                        case "https":
                            this.proxy = new HttpsProxyAgent(`https://${this.opts.PROXY_URL}`);
                            break;
                        case "http":
                            this.proxy = new HttpProxyAgent(`http://${this.opts.PROXY_URL}`);
                            break;
                        default:
                            this.opts.DEBUG_ENABLED && console.log(`[Client.createSocket] Unsupported proxy protocol: ${this.opts.PROXY_PROTOCOL}`);
                    }

                    this.socket = new WebSocket(`wss://${this.hostname}`, {
                        headers: {
                            "Host": this.host,
                            "Connection": "Upgrade",
                            "Pragma": "no-cache",
                            "Cache-Control": "no-cache",
                            "User-Agent": this.opts.USER_AGENT ? this.opts.USER_AGENT : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
                            "Upgrade": "websocket",
                            "Origin": "https://gats.io",
                            "Sec-WebSocket-Version": "13",
                            "Accept-Encoding": "gzip, deflate, br, zstd",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Sec-WebSocket-Key": "GQfO/r2xd4NI6Q94xcyjHQ==",
                            "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits"
                        },
                        method: "GET",
                        agent: this.proxy
                    });
                } catch(err) {
                    console.log(`[Client.connect] Error in creating proxy`);
                }
            }
        } else {
            this.socket = new WebSocket(`wss://${this.hostname}`, {
                headers: {
                    "Host": "us-e-1.gats.io",
                    "Connection": "Upgrade",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
                    "Upgrade": "websocket",
                    "Origin": "https://gats.io",
                    "Sec-WebSocket-Version": "13",
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Sec-WebSocket-Key": "GQfO/r2xd4NI6Q94xcyjHQ==",
                    "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits"
                },
                method: "GET"
            });
        }

        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => this.network.onConnected();
        this.socket.onmessage = (message) => this.network.onMessage(message);
        this.socket.onerror = (error) => console.log(error);
        this.socket.onclose = () => console.log("socket closed");

        this.opts.DEBUG_ENABLED && console.log(`[Client.connect] Socket created successfully for hostname: ${this.hostname}`);
    }

    wipe() {
        this.world.clearBullets();
        this.world.clearPlayers();
        this.world.clearCrates();

        this.socket.close();
        this.socket = null;

        this.connected = false;

        this.world.clearLocalPlayer();

        this.opts.DEBUG_ENABLED && console.log(`[Client.wipe] Client instance wiped`);
    }
}

module.exports = { Client };