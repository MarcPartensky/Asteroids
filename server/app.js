import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
export default app;


const PORT = process.env.PORT | 8000;
console.log(`Port number: ${PORT}`)

import EventEmitter from 'events';
import vm from 'vm';
import fs from 'fs';
import socket from 'socket.io';
import AsteroidServer from '../models/asteroidserver.js';

const server = http.createServer(app);
const io = socket.listen(server);

import Game from './models/game.js';

const files = [
    // Tools and tests
    // "libs/tools.js",
    // "libs/test.js",
    //Base types  
    "libs/iterator.js",
    "libs/dict.js",
    "libs/tree.js",
    // Math types    
    "libs/group.js",
    // "libs/tensor.js",
    // "libs/vector.js",
    "libs/matrix.js",
    // Visual types
    "libs/color.js",
    "libs/point.js",
    "libs/figure.js",
    // "libs/line.js",
    "libs/form.js",
    "libs/basepolygon.js",
    "libs/segment.js",
    "libs/polygon.js",
    "libs/rectangle.js",
    "libs/square.js",
    "libs/circle.js",
    // Physics types
    "libs/motion.js",
    "libs/body.js",
    "libs/plane.js",
    "libs/context.js",
    "libs/entity.js",
    "libs/manager.js",
    // Game types
    "models/gameentity.js",
    "models/missile.js",
    "models/missilegroup.js",
    "models/life.js",
    "models/follower.js",
    "models/shooter.js",
    "models/asteroid.js",
    "models/asteroidgroup.js",
    "models/spaceship.js",
    "models/spaceshipgroup.js",
    "models/meteor.js",
    "models/meteorgroup.js",
    "models/collider.js",
    "models/gamemap.js",
    "models/supergroup.js",
    "models/game.js",
    // Entry point
    "models/gameserver.js",
];

// for (const file of files) {
//     console.log(file);
//     let data = fs.readFileSync(file);
//     let script = new vm.Script(data);
//     script.runInThisContext();
//   }


server.listen(process.env.PORT || 8000)

app.use('/libs', express.static('libs'));
app.use('/models', express.static('models'));
app.use('/dist', express.static('dist'));


const __dirname = path.resolve();
  
console.log(__dirname)

// var path = __dirname.split("/");
// path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});



const game = Game.random();
//console.log(`Le group ${game.group.get('asteroidGroup')}`);
const gameServer = new GameServer(game, io);
gameServer.setUp();
gameServer.main(); 
