// GameClient   => Game => SuperGroup => ...
//                      => GameMap
//              => Context

// GameServer   => Game => SuperGroup => ...
//                      => GameMap

import SuperGroup from './supergroup.js';
import SpaceshipGroup from './spaceshipgroup.js';
import MissileGroup from './missilegroup.js';
import AsteroidGroup from './asteroidgroup.js';
import MeteorGroup from './missilegroup.js';
import Group from '../libs/group.js';
import Motion from '../libs/motion.js';
import Matrix from '../libs/matrix.js';
import Body from '../libs/body.js';
import Point from '../libs/point.js';
import Vector from '../libs/vector.js';
import Tensor from '../libs/tensor.js';
import Spaceship from './spaceship.js';
import Missile from './missile.js';
import Asteroid, {AsteroidForm} from './asteroid.js';
import Meteor from './meteor.js';
import GameMap from './gamemap.js';
import Life, {LifeBar} from './life.js';
import Follower from './follower.js';
import Shooter from './shooter.js';
import Square from '../libs/square.js';
import Rectangle from '../libs/rectangle.js';
import Segment from '../libs/segment.js';
import Polygon from '../libs/polygon.js';
import BasePolygon from '../libs/basepolygon.js';
import { SuperCollider,MissileSpaceshipCollider} from './collider.js';
export default class Game {
    static dt = 0.1;
    static mapTypes = [
        SuperGroup,
        SpaceshipGroup,
        MissileGroup,
        AsteroidGroup,
        MeteorGroup,
        Group,
    ]
    static arrayTypes = [
        Motion,
        Matrix,
        Body,
        Point,
        Vector,
        Tensor,
    ]
    // NOTE THIS IS VERY IMPORTANT
    // EVERY OBJECTS MUST HAVE DEFAULTS ARGUMENTS IN THEIR CONSTRUCTORS
    // OTHERWISE BUGS WILL APPEAR WHILE CREATING OBJECTS WITH NO ARGUMENTS
    // THIS OPERATION IS DONE WHEN ITS IS WRITTEN:
    //      return Object.assign(new type(), value.value);
    static objectTypes = [
        Spaceship,
        Missile,
        Asteroid,
        Meteor,
        GameMap,
        Life,
        LifeBar,
        Follower,
        Shooter,
        //Hunter,
        AsteroidForm,
        Square,
        Rectangle,
        // Circle,
        Segment,
        // Triangle,
        Polygon,
        BasePolygon,
    ]
        
    static reviver(key, value) {
        if(typeof value === 'object' && value !== null) {
            for (const type of Game.mapTypes) {
                if (value.type === type.name) {
                    return new type(value.value);
                }
            }
            for (const type of Game.arrayTypes) {
                if (value.type === type.name) {
                    return type.from(value.value);
                }
            }
            for (const type of Game.objectTypes) {
                if (value.type === type.name) {
                    return Object.assign(new type(), value.value);
                }
            }
            if (value.type === 'Map') {
                return new Map(value.value);
            }
            if (value instanceof Array) {
                return value;
            }
            // return Object.assign(new AsteroidForm(), value);
            // console.log(value);
        }
        return value;
    }

    static replacer(key, value) {
        const originalObject = this[key];
        if (value === null) return null;
        if(originalObject instanceof Map) {
            for (const type of Game.mapTypes) {
                if (originalObject instanceof type) {
                    return {
                        type : type.name,
                        value: Array.from(originalObject.entries())
                    };
                }
            }
            return {
                type: "Map",
                value: Array.from(originalObject.entries())
            };
        } else if (originalObject instanceof Array) {
            for (const type of Game.arrayTypes) {
                if (originalObject instanceof type) {
                    return {
                        type : type.name,
                        value: Array.from(originalObject.round(2))
                    };
                }
            }
        } else if (typeof a == 'number') {
            return Math.round(number*10**2, 2)/10**2;
        } else {
            for (const type of Game.objectTypes) {
                if (originalObject instanceof type) {
                    return {
                        type : type.name,
                        value: {...originalObject}
                    };
                }
            }
            return value;
        }
        return value;
    }
    // Making a getter is memory friendly
    // and it doesn't matter that we can't
    // change the result.
    static get gameMap() {
        return GameMap.fromSize(200,200);
    }
    static random() {
        return new this(
            SuperGroup.random()
        );
    }
    constructor(
        group = new SuperGroup(), // this super group is empty
        collider = new SuperCollider(new MissileSpaceshipCollider()),
        gameMap = Game.gameMap,
        dt = Game.dt
    ) {
        this.group = group;
        this.collider = collider;
        this.gameMap = gameMap;
        this.dt = dt;
    }
    update() {
        // this.collider.collide(this.group);
        this.group.update(this.dt);
        this.limit();
    }
    collide() {
        const collisions = this.collider.collide(this.group);
    }
    show(ctx) {
        this.gameMap.show(ctx);
        this.group.show(ctx);
    }
    limit() {
        const entities = this.group.getAll();
        this.gameMap.limit(entities);
    }
}