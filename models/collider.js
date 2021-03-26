import EventEmitter from 'events';
import Missile from './missile.js';
import Spaceship from './spaceship.js';

export default class Collider {
    collide(group) {
        throw "A Collider must have a collide method which takes a group as an argument."
    }
}

export class SuperCollider extends Collider {
    constructor(...colliders) {
        super();
        this.colliders = colliders;
        this.collisionEmitter = new EventEmitter();
    }
    initCollisionListener(serverEmitter) {
        Missile.initCollisionListener(this.collisionEmitter, serverEmitter);
        Spaceship.initCollisionListener(this.collisionEmitter, serverEmitter);
    }
    collide(superGroup) {
        for (const collider of this.colliders) {
            collider.collide(superGroup, this.collisionEmitter);
        }
    }
}


export class MissileSpaceshipCollider extends Collider {
    collide(group, collisionEmitter) {
        const deadMissiles = [];
        const deadSpaceships = [];
        const missileGroup = group.get('missileGroup');
        const spaceshipGroup = group.get('spaceshipGroup');
        for (const [mid,missile] of missileGroup) {
            for (const [sid, spaceship] of spaceshipGroup) {
                if (missile.collideWithSpaceship(spaceship)) {
                    collisionEmitter.emit('spaceship/missile');
                    collisionEmitter.emit('missile/spaceship');
                    console.log("collision:", mid, sid);
                    deadMissiles.push(mid);
                    deadSpaceships.push(sid);
                }
            }
        }
        for (const sid of deadSpaceships) {
            spaceshipGroup.delete(sid);
        }
        return [deadMissiles, deadSpaceships];
    }
}