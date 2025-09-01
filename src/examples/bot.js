const { Client } = require("./src/client");
const { Captcha } = require("./src/captcha"); //not used (as of now)

const { config } = require("./src/config");

const { ServerList } = require("./src/Servers/list");

const client = new Client({ hostname: ServerList.NA.FFA, host: ServerList.NA.HOST }, config, {});
client.connect();

const GUN = 5; //lmg
const ARMOR = 0; //no armor
const COLOR = 0; //red

client.network.addPacketListener("+", () => {
    client.network.sendJoin(GUN, ARMOR, COLOR);
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let hasJoined = false;

let totalDeaths = 0;
let totalScore = 0;
let totalKills = 0;

let tracking = { score: 0, kills: 0 };

client.network.addJoinListener((data) => {
    console.log(client.world.localPlayer.x, client.world.localPlayer.y);
    if(!hasJoined) {
        hasJoined = true;

        console.log('Joined game with username:', data.username);

        client.network.addEntityUpdateListener((data) => {
            const target = client.world.getNearestPlayer(1500);

            const local = client.world.localPlayer;

            tracking.score = local.score;
            tracking.kills = local.kills;

            if(target == null) {
                client.network.sendInput(6, 0);
                
                const centerX = 3500;
                const centerY = 3500;
                const centerThreshold = 10;
                
                const dxCenter = centerX - local.x;
                const dyCenter = centerY - local.y;
                
                client.network.sendInput(0, 0); //left
                client.network.sendInput(1, 0); //right
                client.network.sendInput(2, 0); //up
                client.network.sendInput(3, 0); //down
                
                if (Math.abs(dxCenter) > centerThreshold || Math.abs(dyCenter) > centerThreshold) {
                    if (dxCenter > centerThreshold) {
                        client.network.sendInput(1, 1);
                    } else if (dxCenter < -centerThreshold) {
                        client.network.sendInput(0, 1);
                    }
                    
                    if (dyCenter > centerThreshold) {
                        client.network.sendInput(3, 1);
                    } else if (dyCenter < -centerThreshold) {
                        client.network.sendInput(2, 1);
                    }
                }
            } else {
                const angle = Math.round(((Math.atan2(target.y - local.y, target.x - local.x) * 180 / Math.PI) + 360) % 360);
            
                const mx = random(-250, 250);
                const my = random(-250, 250);

                const username = parseInt(target.username.split("#")[1]);
                //console.log(formatUsername(username));
                
                client.network.sendMouseMoved(mx, my, angle);
                client.network.sendInput(6, 1);

                const dx = target.x - local.x;
                const dy = target.y - local.y;
                const threshold = 1;
                
                client.network.sendInput(0, 0);
                client.network.sendInput(1, 0);
                client.network.sendInput(2, 0);
                client.network.sendInput(3, 0);
                
                if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
                    if (dx > threshold) {
                        client.network.sendInput(1, 1);
                    } else if (dx < -threshold) {
                        client.network.sendInput(0, 1);
                    }
                    
                    if (dy > threshold) {
                        client.network.sendInput(3, 1);
                    } else if (dy < -threshold) {
                        client.network.sendInput(2, 1);
                    }
                }
                
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 500) {
                    client.network.sendInput(6, 1);
                } else {
                    client.network.sendInput(6, 0);
                }
            }
        })

        client.network.addPlayerDeadListener(() => {
            totalDeaths++;

            totalScore += tracking.score;
            totalKills += tracking.kills;

            console.log(`KD: ${totalKills/totalDeaths} | Total score: ${totalScore} | Total kills: ${totalKills}`);

            setTimeout(() => {
                client.network.sendJoin(GUN, ARMOR, COLOR);
            }, 250);
        })
    }
})