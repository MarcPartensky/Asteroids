import Entity from '../libs/entity.js';
import Segment from '../libs/segment.js';

export default class Missile extends Entity {
    static size = 3;
    static duration = 1000/10; // mili-seconds
    static velocityBoost = 10;
    static damage = 0.1;
    static margin = 1;
    static color = "yellow";
    static random(
        source=undefined,
        target=undefined
    ) {
        return new this(
            new Segment([0, 0], [0, Missile.size]),
            Body.random(1, 2),
            source,
            target
        );
    }
    static make(
        source,
        target=undefined,
        damage=Missile.damage,
        duration=Missile.duration
    ) {
        const body = new Body(source.body[0].slice(0, 2).copy());
        body[0][1].norm += this.velocityBoost;
        const radius = source.form.hitBubbleRadius;
        const margin = body[0][1].normalized.rmul(radius+Missile.size/2+Missile.margin);
        body[0][0].iadd(margin);
        return new this(
            new Segment([0, 0], [0, Missile.size], 1, Missile.color),
            body,
            source,
            target,
            damage,
            duration
        );
        
    }
    constructor(
        form,
        body,
        source=undefined,
        target=undefined,
        damage=Missile.damage,
        duration=Missile.duration,
    ) {
        super(form, body);
        Missile.initCollision(this);
        this.source = source;
        this.target = target;
        this.damage = damage;
        this.duration = duration;
        this.time = undefined;
    }
    update(dt) {
        if (!this.time) {
            this.time = Date.now()
        }
        if (!this.isAlive(dt)) {
            this.removing = true;
        }
        this.form.angle = this.body[0][1].angle;
        super.update(dt);
    }
    get left() {
        return Date.now() - this.time;
    }
    isAlive(dt) {
        return this.left*dt<this.duration;
    }
    /**
     * Determine whether a missile is colliding with a spaceshiop
     * @param {Spaceship} spaceship 
     */
    collideWithSpaceship(spaceship) {//pk c'est pas static ? parce que c'est la vie
        return spaceship.form.contains(this.form.p1) || spaceship.form.contains(this.form.p2);
    }

    static initCollisionListener(collisionEmitter, mainEmitter) {
        collisionEmitter.on('missile/spaceship', function(missile, spaceship) {
            missile.removing = true;
        })
    }    
}