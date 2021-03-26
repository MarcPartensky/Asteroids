import Group from '../libs/group.js';
import AsteroidGroup from './asteroidgroup.js';
import MeteorGroup from './meteorgroup.js';
import SpaceshipGroup from './spaceshipgroup.js';
import MissileGroup from './missilegroup.js';

export default class SuperGroup extends Group {
    static random() {
        const g = new this();
        g.set('asteroidGroup', AsteroidGroup.asteroidField(50, {x: 0, y: 0}, {x: 100, y: 100}));
        g.set("meteorGroup", MeteorGroup.meteorShower(100));
        g.set("spaceshipGroup", SpaceshipGroup.readyZeroPlayer());
        return g;
    }
    constructor(...args) {
        super(...args);
        this.setDefault("asteroidGroup", new AsteroidGroup());
        this.setDefault("meteorGroup", new MeteorGroup());
        this.setDefault("missileGroup", new MissileGroup());
        this.setDefault("spaceshipGroup", new SpaceshipGroup());
    }
}