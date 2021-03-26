const express = require('express'), // for easier syntax;
    http = require('http'),
    socket = require('socket.io'), // for easier connexion
    ent = require('ent'), // html url security
    os = require('os'), // os access
    fs = require('fs'), // file system
    vm = require('vm'), // to execute scripts
    ss = require('socket.io-stream'); // to stream data

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

// server.maxConnections = 10;



const files = [
  "libs/tools.js",
  "libs/test.js",
  "libs/iterator.js",
  "libs/group.js",
  "libs/tensor.js",
  "libs/vector.js",
  "libs/matrix.js",
  "libs/color.js",
  "libs/point.js",
  "libs/figure.js",
  "libs/form.js",
  "libs/polygon.js",
  "libs/rectangle.js",
  "libs/circle.js",
  "libs/motion.js",
  "libs/body.js",
  "libs/plane.js",
  "libs/context.js",
  "libs/manager.js",

  "model/basecircle.js",
  "model/game/ball.js",
  "model/game/food.js",
  "model/game/virus.js",
  "model/game/collider.js",
  "model/game/supergroup.js",
  "model/game/player.js",
  "model/game/gamemap.js",
  "model/game/game.js",
  "model/game/gameclient.js",
  "model/game/gameserver.js",
];

for (const file of files) {
  let data = fs.readFileSync(file);
  let script = new vm.Script(data);
  script.runInThisContext();
}

app.use('/libs', express.static('libs'));
app.use('/public', express.static('model/game'));
app.use('/view/home/', express.static('../view'));

var path = __dirname.split("/");
path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
  res.sendFile(path + "/view/game/index.html");
});


app.get('/game', function (req, res) {
  res.sendFile(path + "/view/game/index.html");
});


io.on('connection', function (socket, name) {
  socket.on('play-button', function(name) {
    console.log("play button pressed");
    res.redirect('/game?name=${name}');
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
  socket.on("message", function(message) {
    console.log(message);
  })

});

server.listen(process.env.PORT || 8000)


var game = Game.random(5);
game.updateMap();
// console.log(game.map);
var gameServer= new GameServer(game);
// console.log(io.sockets.broadcast);


gameServer.main(io, ss);

