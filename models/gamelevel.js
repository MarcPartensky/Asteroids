import SuperGroup from './supergroup.js';
import AsteroidGroup from './asteroidgroup.js';
export default class GameLevel {
    constructor() {

    }
    get group() {
        return new SuperGroup();
    }
}


export class AsteroidLevel extends GameLevel {
    constructor(n) {
        super();
        this.n = n;
    }
    get group() {
        return new SuperGroup([
            ['asteroidGroup', AsteroidGroup.random(this.n)]
        ]);

    }
    update() {

    }

}