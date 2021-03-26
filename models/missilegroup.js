import {Grouper} from '../libs/group.js';
import Missile from './missile.js';

export default class MissileGroup extends Grouper(Missile) {
    static n = 0;
    removeDeads() {
        const deads = []
        for (const [k,v] of this) {
            if (v.removing) {
                deads.push(k)
            }
        }
        for (const dead of deads) {
            this.delete(dead)
        }
    }
    update(dt) {
        super.update(dt);
        this.removeDeads()
    }
    add(missile) {
        MissileGroup.n += 1;
        super.add(String(MissileGroup.n), missile);
    }
}