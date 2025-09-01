const config = {
    /**
     * Used to enable basic debugging of actions and packets loaded
     * @type {boolean}
     * @default true
     */
    DEBUG_ENABLED: true,

    /**
     * Enables more verbose/intense debugging
     * @type {boolean}
     * @default false
     */
    INTENSE_DEBUG_ENABLED: false,

    /**
     * Whether to use a proxy for connections
     * If this property is set to true, PROXY_URL and PROXY_PROTOCOL cannot be null
     * @type {boolean}
     * @default false
     */
    USE_PROXY: false,

    /**
     * Defines the proxy protocol (socks5, http, https)
     * @type {string}
     * @default null
     */
    PROXY_PROTOCOL: null,

    /**
     * Proxy server URL to use when `USE_PROXY` is true
     * @type {?string}  //string or null
     * @default null
     */
    PROXY_URL: null,

    /**
     * Enables input packets being sent every 30 seconds for anti disconnection
     * @type {boolean}
     * @default false
     */
    ANTI_AFK_ENABLED: true,

    USER_AGENT: null
};

module.exports = { config };