import Tensor from '../libs/tensor.js';
import Vector from '../libs/vector.js';
import Matrix from '../libs/matrix.js';
import Motion from '../libs/motion.js';
import Body from '../libs/body.js';

import Point from '../libs/point.js';
import Figure from '../libs/figure.js';
import Form from '../libs/form.js';
import BasePolygon from '../libs/basepolygon.js';
import Square from '../libs/square.js';
import Rectangle from '../libs/rectangle.js';
import Segment from '../libs/segment.js';
import Polygon from '../libs/polygon.js';

import Life, {LifeBar} from './life.js';
import Follower from './follower.js';
import Shooter from './shooter.js';

import Spaceship from './spaceship.js';
import Missile from './missile.js';
import Asteroid, {AsteroidForm} from './asteroid.js';
import Meteor from './meteor.js';

import Group from '../libs/group.js';
import SuperGroup from './supergroup.js';
import SpaceshipGroup from './spaceshipgroup.js';
import MissileGroup from './missilegroup.js';
import AsteroidGroup from './asteroidgroup.js';
import MeteorGroup from './missilegroup.js';

import GameMap from './gamemap.js';
import { SuperCollider,MissileSpaceshipCollider} from './collider.js';


var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

// var name = prompt("name");
var host = String(document.location);
var socket = io.connect(host) //, {query: "name="+name});



// var group = SuperGroup.random();
// var game = new Game(group);
var game = Game.random();



gameClient = new GameClient(canvas, game, socket)

gameClient.main();

