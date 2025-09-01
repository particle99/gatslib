const { Player } = require("../Entities/player");
const { Bullet } = require("../Entities/bullet");
const { Crate } = require("../Entities/crate");
const { EventEmitter } = require("stream");

class Network extends EventEmitter {
    constructor(instance) {
        super();
        this.instance = instance;

        //anti afk stuff
        this.antiAfkListener = 0;
        this.lastSentInput = performance.now();
        this.lastSentInputIndex = 0;
    }

    onMessage(message) {
        const decompressed = this.instance.codec.decompressMessage(message.data);

        for(const packet of decompressed) {
            const formatted = this.instance.codec.formatPacket(packet.parts);

            switch(packet.code) {
                case "a": this.onJoin(formatted); break;
                case "b": this.onEntityUpdate(formatted); break;
                case "c": this.onAuxiliaryUpdate(formatted); break;
                case "d": this.onPlayerActivation(formatted); break;
                case "e": this.onPlayerDeactivation(formatted); break;
                case "f": this.onFirstPersonUpdate(formatted); break;
                case "g": this.onBulletActivation(formatted); break;
                case "h": this.onBulletUpdate(formatted); break;
                case "i": this.onBulletDeactivation(formatted); break;
                case "j": this.onCrateActivation(formatted); break;
                case "v": this.onLeaderboardUpdate(formatted); break;
                case "s": this.onPlayerDead(); break;
                case "+": this.onCaptcha(); break;
                case ".": this.onPing(); break;
                //case "re": this.onRespawn(formatted); break;
                //default: this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onMessage] Unknown packet code received: ${packet.code}`);
            }

            this.emit(packet.code, formatted);

            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onMessage] Packet received: ${packet.code}`);
        }
    }

    onConnected() {
        this.instance.socket.send(this.instance.codec.buildPingPacket());
        this.instance.connected = true;

        if(!this.antiAfkListener && this.instance.opts.ANTI_AFK_ENABLED) {
            this.addEntityUpdateListener(() => {
                this.antiAfkListener = 1;

                if(!this.instance.opts.ANTI_AFK_ENABLED) return;

                const now = performance.now();

                //every 30 seconds send input (basically moving in a square)
                if(now - this.lastSentInput > 10000) {
                    this.sendInput(this.lastSentInputIndex, 1);

                    setTimeout(() => { 
                        this.sendInput(this.lastSentInputIndex, 0);
                        this.lastSentInputIndex > 3 ? this.lastSentInputIndex = 0 : this.lastSentInputIndex++;
                    }, 500);

                    this.lastSentInput = now;
                }
            });
        }
    }

    onError(error) {
        //throw new Error(error);
        console.log("error happened");
    }

    onJoin(data) {
        if(this.instance.world.localPlayer !== null) {
            this.instance.world.localPlayer.activate(data, false);
            this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onJoin] Player respawned`);
        } else {
            const id = parseInt(data.id);
            const player = new Player(this.instance, id);

            player.activate(data, false);

            this.instance.world.setLocalPlayer(player);
            this.instance.world.addPlayer(player);

            this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onJoin] Player joined game with ID: ${id}`);
        }
    }

    onEntityUpdate(data) { 
        const id = parseInt(data.id);
        const player = this.instance.world.getPlayer(id);

        if(player == null) {
            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onEntityUpdate] Player is attempting to be updated while not in map with ID: ${id}`);
            return;
        }

        player.applyPrimaryUpdate(data);

        //opts.INTENSE_DEBUG_ENABLED used because packet code "b" is sent every tick
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onEntityUpdate] Player ${id} updated: ${data}`);
    }

    onAuxiliaryUpdate(data) { 
        const id = parseInt(data.id);
        const player = this.instance.world.getPlayer(id);

        if(player == null) {
            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onAuxiliaryUpdate] Player is attempting to be updated while not in map with ID: ${id}`);
            return;
        }

        player.applyAuxUpdate(data);

        //opts.INTENSE_DEBUG_ENABLED used because packet code "c" is sent often
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onAuxiliaryUpdate] Player ${id} updated: ${data}`);
    }

    onPlayerActivation(data) {
        const id = parseInt(data.id);
        const playerInMap = this.instance.world.getPlayer(id);

        if(playerInMap == null) {
            const player = new Player(this.instance, id);

            player.activate(data, false);
            this.instance.world.addPlayer(player);

            //opts.INTENSE_DEBUG_ENABLED used because packet code "d" is sent often
            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onPlayerActivation] Player ${id} activated`);
        } else {
            playerInMap.activate(data, false);

            //opts.INTENSE_DEBUG_ENABLED used because packet code "d" is sent often
            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onPlayerActivation] Player ${id} activated`);
        }
    }

    onPlayerDeactivation(data) { 
        const id = parseInt(data.id);
        const player = this.instance.world.getPlayer(id);

        if(player == null) {
            this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onPlayerDeactivation] Player is attempting to be deactivated while not in map with ID: ${id}`);
            return;
        }

        player.deactivate();
        //do not remove the player
        //this.instance.world.removePlayer(player);

        //opts.INTENSE_DEBUG_ENABLED used because packet code "e" is sent often
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onPlayerDeactivation] Player ${id} deactivated`);
    }

    onFirstPersonUpdate(data) { 
        if(this.instance.world.localPlayer == null) {
            this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onFirstPersonUpdate] Local player is attempting to be updated while not defined`);
            return;
        }  

        this.instance.world.localPlayer.applyFirstPersonUpdateData(data);

        //opts.INTENSE_DEBUG_ENABLED used because packet code "f" is sent often
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[Network.onFirstPersonUpdate] Player updated`);
    }

    onBulletActivation(data) { 
        const id = parseInt(data);
        const bulletInMap = this.instance.world.getBullet(id);
    }

    onBulletUpdate(data) { }
    onBulletDeactivation(data) { }
    onCrateActivation(data) { }
    onCrateDeactivation(data) { }
    onLeaderboardUpdate(data) { }
    onPlayerDead() {
        for(let player of this.instance.world.players.values()) player.deactivate();

        this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onPlayerDead] Player died`);
    }
    onRespawn(data) { 
        this.instance.world.clearPlayers();
        this.instance.world.clearBullets();
        this.instance.world.clearCrates();

        this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onRespawn] Player respawned, clearing all saved data`);
    }

    onCaptcha() {
        /**
        if(!this.instance.captcha.token || !this.instance.captcha.timestamp) {
            this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onCaptcha] Captcha is not defined before creating client, wiping instance`);
            
            if(this.instance.socket) {
                this.instance.socket.close();
                this.instance.wipe();
            }

            return;
        }

        if(this.instance.socket) {
            const token = this.instance.captcha.token;
            const timestamp = this.instance.captcha.timestamp;

            this.instance.socket.send(this.instance.codec.buildCaptchaPacket(token, timestamp));

            this.instance.opts.DEBUG_ENABLED && console.log(`[Network.onCaptcha] Captcha sent`);
        }*/
    }

    onPing() {
        this.instance.socket.send(this.instance.codec.buildPingPacket());
    }

    addPacketListener(packet, callback) {
        this.on(packet, callback);
    }

    addJoinListener(callback) {
        this.addPacketListener("a", callback);
    }

    addEntityUpdateListener(callback) {
        this.addPacketListener("b", callback);
    }

    addAuxiliaryUpdateListener(callback) {
        this.addPacketListener("c", callback);
    }

    addPlayerActivationListener(callback) {
        this.addPacketListener("d", callback);
    }

    addPlayerDeactivationListener(callback) {
        this.addPacketListener("e", callback);
    }

    addFirstPersonUpdateListener(callback) {
        this.addPacketListener("f", callback);
    }

    addBulletActivationListener(callback) {
        this.addPacketListener("g", callback);
    }

    addBulletUpdateListener(callback) {
        this.addPacketListener("h", callback);
    }

    addBulletDeactivationListener(callback) {
        this.addPacketListener("i", callback);
    }

    addCrateActivationListener(callback) {
        this.addPacketListener("j", callback);
    }

    addLeaderboardUpdateListener(callback) {
        this.addPacketListener("v", callback);
    }

    addPlayerDeadListener(callback) {
        this.addPacketListener("s", callback);
    }

    sendJoin(gun, armor, color) {
        if(this.instance.socket) this.instance.socket.send(this.instance.codec.buildJoinPacket(gun, armor, color));
    }

    sendInput(type, state) {
        if(this.instance.socket) this.instance.socket.send(this.instance.codec.buildInputPacket(type, state));
    }

    sendChat(message) {
        if(this.instance.socket) this.instance.socket.send(this.instance.codec.buildChatPacket(message));
    }

    sendMouseMoved(mx, my, mangle) {
        if(this.instance.socket) this.instance.socket.send(this.instance.codec.buildMouseMovedPacket(mx, my, mangle));
    }

    sendUpgrade(type, index) {
        if(this.instance.socket) this.instance.socket.send(this.instance.codec.buildUpgradePacket(type, index));
    }
}

module.exports = { Network };