// Cool explosion when the missiles hit something.
import { ColorChanger } from '../libs/animation.js';
export default class Explosion extends ColorChanger {
    constructor() {
        
    }
    end() {
        super.end();
        this.object.removing = true;
    }
}