class Crate {
    constructor(instance, id) {
        this.instance = instance;
        this.id = id;

        this.parent = 0;
        this.type = "";

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;
        this.angle = 0;

        this.maxHp = 0;
        this.hp = 0;

        this.bulletCollisions = 0;
        this.model = null;
        this.animationFrame = 0;

        this.isPremium = 0;

        this.activated = 0;
    }

    activate(args) {
        this.parent = args.parent;
        this.type = args.type;

        this.x = args.x / 10;
        this.y = args.y / 10;

        this.angle = args.angle;
        
        this.maxHp = args.maxHp;
        this.hp = args.hp;

        this.isPremium = args.isPremium;

        switch(this.type) {
            case "crate":
                this.width = 50;
                this.height = 50;
                this.bulletCollisions = true;
                break;
            case "longCrate":
                this.width = 50;
                this.height = 100;
                this.bulletCollisions = true;
                break;
            case "medKit":
                this.width = 33;
                this.height = 33;
                this.bulletCollisions = false;
                break;
            case "shield":
                this.width = 16;
                this.height = 50;
                this.bulletCollisions = true;
            default:
                break;
        }

        this.activated = 1;
    }

    deactivate() {
        this.parent = 0;
        this.type = "";

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;
        this.angle = 0;

        this.maxHp = 0;
        this.hp = 0;

        this.bulletCollisions = 0;
        this.model = null;
        this.animationFrame = 0;

        this.isPremium = 0;

        this.activated = 0;
    }

    getAttr() {
        return {
            x: this.x, 
            y: this.y
        }
    }

    update() {
        if(!this.activated) return;

        if(this.type == "shield") {
            const owner = this.instance.world.getPlayer(this.parent);

            if(owner !== null) {
                const value = owner.playerAngle * (Math.PI / 180);

                this.x = owner.x + owner.spdX / 2.5 + Math.cos(value);
                this.y = owner.y + owner.spdY / 2.5 + Math.sin(value);

                this.angle = owner.playerAngle;
            }
        }
    }

    applyUpdate(args) {
        if(!this.activated) return;

        this.x = args.x / 10;
        this.y = args.y / 10;

        this.angle = args.angle;

        if(args.hp) this.hp = parseInt(args.hp);
    }

    draw() { /** not used */ }
}

module.exports = { Crate };