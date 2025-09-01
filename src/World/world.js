class World {
    constructor(instance) {
        this.instance = instance;

        this.players = new Map();
        this.bullets = new Map();
        this.crates = new Map();

        this.localPlayer = null;
    }

    setLocalPlayer(player) {
        this.localPlayer = player;
    }

    clearLocalPlayer() {
        this.localPlayer = null; //for when player dies
    }

    addPlayer(player) {
        if(this.players.has(player.id)) return;

        this.players.set(player.id, player);
        this.instance.opts.DEBUG_ENABLED && console.log(`[World.players] New player set with ID: ${player.id} | New player map size: ${this.players.size}`);
    }

    removePlayer(player) {
        if(!this.players.has(player.id)) return;

        this.players.delete(player.id);
        this.instance.opts.DEBUG_ENABLED && console.log(`[World.players] New player removed with ID: ${player.id} | New player map size: ${this.players.size}`);
    }

    getPlayer(id) {
        if(!this.players.has(id)) {
            return null;
        } else {
            const player = this.players.get(id);
            return player;
        }
    }

    addBullet(bullet) {
        if(this.bullets.has(bullet.id)) return;

        this.bullets.set(bullet.id, bullet);
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[World.bullets] New bullet added with ID: ${bullet.id} | New bullet map size: ${this.bullets.size}`);
    }

    removeBullet(bullet) {
        if(!this.bullets.has(bullet.id)) return;

        this.bullets.delete(bullet.id);
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[World.bullets] New bullet removed with ID: ${bullet.id} | New bullet map size: ${this.bullets.size}`);
    }

    getBullet(id) {
        if(!this.bullets.has(id)) {
            return null;
        } else {
            const bullet = this.bullets.get(id);
            return bullet;
        }
    }

    addCrate(crate) {
        if(this.crates.has(crate.id)) return;

        this.crates.set(crate.id, crate);
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[World.crates] New crate added with ID: ${crate.id} | New crate map size: ${this.crates.size}`);
    }

    removeCrate(crate) {
        if(!this.crates.has(bullet.id)) return;

        this.crates.delete(crate.id);
        this.instance.opts.INTENSE_DEBUG_ENABLED && console.log(`[World.crates] New crate removed with ID: ${crate.id} | New crate map size: ${this.crates.size}`);
    }

    getCrate(id) {
        if(!this.crates.has(id)) {
            return null;
        } else {
            const crate = this.crates.get(id);
            return crate;
        }
    }

    getPos() {
        if(!this.localPlayer) {
            return {
                x: -1,
                y: -1
            }
        } else {
            return {
                x: this.localPlayer.x,
                y: this.localPlayer.y
            }
        }
    }

    clearPlayers() {
        this.players.clear();
    }

    clearBullets() {
        this.bullets.clear();
    }

    clearCrates() {
        this.crates.clear();
    }

    getNearestPlayer(maxDist) {
        if (!this.localPlayer) return null;

        const local = this.localPlayer;
        let nearest = null;
        let nearestDist = Infinity;

        for (const player of this.players.values()) {
            if (player.id === local.id) continue;

            const dx = player.x - local.x;
            const dy = player.y - local.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < nearestDist && player.activated) {
                nearestDist = dist;
                nearest = player;
            }
        }

        if(nearestDist > maxDist) return null;
        else return nearest;
    }
}

module.exports = { World };