class Player {
    constructor(instance, id) {
        this.instance = instance;
        this.id = id;

        this.class = "";
        this.color = "";

        this.x = 0;
        this.y = 0;

        this.spdX = 0;
        this.spdY = 0;

        this.radius = 0;
        this.playerAngle = 0;

        this.hp = 0;
        this.hpRadius = 0;

        this.armorAmount = 0;

        this.shootingAnimation = null;
        this.beingHit = 0;
        this.shooting = 0;
        this.shootingFrame = 0;
        this.reloading = 0;
        this.relodingFrame = 0;

        this.ghillie = 0;
        this.thermal = 0;
        this.dashing = 0;
        
        this.currentBullets = 0;
        this.maxBullets = 0;

        this.invincible = 0;
        
        this.username = "";

        this.isLeader = 0;
        this.isPremiumMember = 0;

        this.chatBoxOpen = 0;
        
        this.j47 = "";
        this.j47Timer = 0;

        this.armor = 0;
        this.c2 = 0;
        
        this.hpMax = 0;

        this.kills = 0;
        this.deaths = 0;
        this.score = 0;

        this.teamCode = 0;
        
        this.numExplosivesLeft = 0;
        
        this.activated = 0;
    }

    activate(args, other) {
        this.class = args.class;
        this.color = args.color;
        
        this.x = parseFloat(args.x / 10);
        this.y = parseFloat(args.y / 10);

        this.radius = parseInt(args.radius / 10);
        this.playerAngle = parseInt(args.playerAngle);

        this.hp = parseInt(args.hp);
        this.hpRadius = this.hp * this.radius / 100;

        this.armorAmount = parseInt(args.armorAmount);

        this.ghillie = args.ghillie;

        this.maxBullets = args.maxBullets;
        
        this.invincible = args.invincible;

        this.username = args.username;

        this.isLeader = parseInt(args.isLeader);
        this.isPremiumMember = parseInt(args.isPremiumMember);

        this.teamCode = parseInt(args.teamCode);
        this.chatBoxOpen = parseInt(args.chatBoxOpen);

        if(!other) {
            this.currentBullets = parseInt(args.currentBullets);
            this.maxBullets = parseInt(args.maxBullets);

            this.armor = args.armor;
            this.c2 = args.c2;

            this.hpMax = args.hpMax;

            this.numExplosivesLeft = 3;
        }

        this.activated = 1;
    }

    deactivate() {
        this.class = "";
        this.color = "";

        this.x = 0;
        this.y = 0;

        this.spdX = 0;
        this.spdY = 0;

        this.radius = 0;
        this.playerAngle = 0;

        this.hp = 0;
        this.hpRadius = 0;

        this.armorAmount = 0;

        this.shootingAnimation = null;
        this.beingHit = 0;
        this.shooting = 0;
        this.shootingFrame = 0;
        this.reloading = 0;
        this.relodingFrame = 0;

        this.ghillie = 0;
        this.thermal = 0;
        this.dashing = 0;
        
        this.currentBullets = 0;
        this.maxBullets = 0;

        this.invincible = 0;
        
        this.username = "";

        this.isLeader = 0;
        this.isPremiumMember = 0;

        this.chatBoxOpen = 0;
        
        this.j47 = "";
        this.j47Timer = 0;

        this.armor = 0;
        this.c2 = 0;
        
        this.hpMax = 0;

        this.kills = 0;
        this.deaths = 0;
        this.score = 0;

        this.teamCode = 0;
        
        this.numExplosivesLeft = 0;
        
        this.activated = 0;
    }

    applyPrimaryUpdate(args) {
        if(!this.activated) return;

        this.x = parseFloat(args.x / 10);
        this.y = parseFloat(args.y / 10);
        this.spdX = parseFloat(args.spdX / 10);
        this.spdY = parseFloat(args.spdY / 10);

        if(this.instance.world.localPlayer && args.id !== this.instance.world.localPlayer.id) this.playerAngle = args.playerAngle;
    }

    applyAuxUpdate(args) {
        if(!this.activated) return;

        if(args.currentBullets) this.currentBullets = parseInt(args.currentBullets);
        if(args.shooting) this.shooting = parseInt(args.shooting);
        if(args.reloading) this.reloading = parseInt(args.reloading);
        if(args.hp) this.hp = parseInt(args.hp);
        if(args.beingHit) this.beingHit = parseInt(args.beingHit);
        if(args.armorAmount) this.armorAmount = parseInt(args.armorAmount);
        if(args.radius) this.radius = parseInt(args.radius);
        if(args.ghillie) this.ghillie = parseInt(args.ghillie);
        if(args.maxBullets) this.maxBullets = parseInt(args.maxBullets);
        if(args.invincible) this.invincible = parseInt(args.invincible);
        if(args.dashing) this.dashing = parseInt(args.dashing);
        if(args.chatBoxOpen) this.chatBoxOpen = parseInt(args.chatBoxOpen);
        if(args.color) this.color = args.color;
        if(args.isLeader) this.isLeader = args.isLeader;
    }

    applyFirstPersonUpdateData(args) {
        if(!this.activated) return;

        if(args.currentBullets) this.currentBullets = parseInt(args.currentBullets);
        if(args.score) this.score = parseInt(args.score);
        if(args.kills) this.kills = parseInt(args.kills);
        if(args.rechargeTimer) {}
        if(args.maxBullets) this.maxBullets = parseInt(args.maxBullets);
        if(args.thermal) this.thermal = parseInt(args.thermal);
        if(args.numExplosivesLeft) this.numExplosivesLeft = parseInt(args.numExplosivesLeft);
    }

    update() {
        //this.updateHpRadius();

        if(this.hp > 0) {
            this.x += Math.round(this.spdX / 2.5);
            this.y += Math.round(this.spdY / 2.5);
        }

        //this.updateChatMessage();
    }
}

module.exports = { Player };