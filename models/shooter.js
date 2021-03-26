import Missile from './missile.js';

// Using strategy pattern for spaceships
export default class Shooter {
    static types = [Missile];
    constructor(types, selection=0) {
        this.types = types;
        this.selection = selection;
        this.shooted = 0; // optional
        this.last_shooting = 0; // against shoot spam
    }
    get type() {
        return this.types[this.selection];
    }
    set type(v) {
        this.types[this.selection] = v;
    }
    shoot(entity) {
        this.last_shooting = Date.now();
        this.shooted += 1;
        return this.constructor.types[this.type].make(entity);
    }
}