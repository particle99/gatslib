class Bullet {
    constructor(instance, id) {
        this.instance = instance;
        this.id = id;

        this.x = 0;
        this.y = 0;

        this.length = 0;
        this.width = 0;
        this.angle = 0;

        this.spdX = 0;
        this.spdY = 0;

        this.totalLifeTime = 0;
        this.parent = 0;
        this.timeAlive = 0;

        this.silenced = 0;
        this.isKnife = 0;
        this.isShrapnel = 0;

        this.ownerId = 0;
        this.teamCode = 0;

        this.model = 0;
        this.animationFrame = 0;

        this.activated = 0;
    }

    activate(args) {
        this.x = parseFloat(args.x / 10);
        this.y = parseFloat(args.y / 10);

        this.length = parseInt(args.length);
        this.width = parseInt(args.width);
        this.angle = parseInt(args.angle);

        this.spdX = parseInt(args.spdX / 25);
        this.spdY = parseInt(args.spdY / 25);

        this.silenced = parseInt(args.silenced);
        this.isKnife = parseInt(args.isKnife);
        this.isShrapnel = parseInt(args.isShrapnel);

        this.ownerId = parseInt(args.ownerId);
        this.teamCode = parseInt(args.teamCode);

        if(this.isKnife) { }

        this.activated = 1;
    }

    deactivate() {
        this.x = 0;
        this.y = 0;

        this.length = 0;
        this.width = 0;
        this.angle = 0;

        this.spdX = 0;
        this.spdY = 0;

        this.totalLifeTime = 0;
        this.parent = 0;
        this.timeAlive = 0;

        this.silenced = 0;
        this.isKnife = 0;
        this.isShrapnel = 0;

        this.ownerId = 0;
        this.teamCode = 0;

        this.model = 0;
        this.animationFrame = 0;

        this.activated = 0;
    }

    getAttr() {
        return {
            x: this.x,
            y: this.y
        }
    }

    applyUpdate(args) {
        this.timeAlive++;

        this.x = parseInt(args.x / 10);
        this.y = parseInt(args.y / 10);
    }

    update() {
        if(!this.activated) return;

        this.x += this.spdX;
        this.y += this.spdY;
    }

    draw() { /** not needed */ } 
}

module.exports = { Bullet };