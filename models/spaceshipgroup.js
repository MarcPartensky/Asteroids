import Spaceship from './spaceship.js';
import { Grouper } from '../libs/group.js';
export default class SpaceshipGroup extends Grouper(Spaceship) {
    static type = Spaceship;
    static readyOnePlayer(){
        const s = Spaceship.random();
        return new this([["spaceship:0",s]]);
    }
    static readyZeroPlayer() {
        return new this([]);
    }

    // sg = new SpaceshipGroup();
    // sg.set(key, value)
    // sg.delete(key)
    
    // addSpaceship(idSpaceship, spaceshipObject) {
    //    //Ajoute le spaceship spaceshipObject dans le groupe this avec l'id idSpaceship
    //     this.set(`spaceship:${idSpaceship}`,  spaceshipObject);
    // }

    // removeSpaceship(idSpaceship) {
    //     // debug(`la classe de notre instance spaceshipGroup ${this.constructor.name}`);
    //     // this=this.filter(array => array[0] !==  `spaceship:${idSpaceship}`);
    //     // debug(`la classe de notre instance spaceshipGroup ${this.constructor.name}`);
        
    // }
}