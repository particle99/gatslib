/** OLD EXAMPLE, NOT USEABLE */

const { Client } = require("./src/client");
const { Captcha } = require("./src/captcha"); //not used (as of now)

const { ServerList } = require("./src/Servers/list");

const opts = {
    DEBUG_ENABLED: true,
    INTENSE_DEBUG_ENABLED: false, //not recommended to have enabled
}

const client = new Client({ hostname: ServerList.NA.DOM, host: ServerList.NA.HOST }, opts, {});
client.connect();

client.network.addPacketListener("+", () => {
    client.socket.send(client.codec.buildJoinPacket(1,2,3));
});

client.network.addJoinListener(() => {
    client.network.addEntityUpdateListener(() => {
        const target = client.world.getNearestPlayer(1500);

        if(target == null) return;

        const local = client.world.localPlayer;

        const angle = Math.round(((Math.atan2(target.y - local.y, target.x - local.x) * 180 / Math.PI) + 360) % 360);
    
        client.socket.send(client.codec.buildMouseMovedPacket(500, 500, angle));
    });
});