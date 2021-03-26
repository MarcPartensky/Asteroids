// Using strategy pattern for spaceships
export default class Hunter {
    constructor(spaceship, target=undefined) {
        this.spaceship = spaceship;
        this.target = target;
    }
    hunt() {
        this.spaceship.follow(this.target.center);
    }
}