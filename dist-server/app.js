"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _events = _interopRequireDefault(require("events"));

var _vm = _interopRequireDefault(require("vm"));

var _fs = _interopRequireDefault(require("fs"));

var _socket = _interopRequireDefault(require("socket.io"));

var _asteroidserver = _interopRequireDefault(require("../models/asteroidserver.js"));

var _game = _interopRequireDefault(require("./models/game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(_dirname, '../public')));
app.use('/', _index["default"]);
app.use('/users', _users["default"]);
var _default = app;
exports["default"] = _default;
var PORT = process.env.PORT | 8000;
console.log("Port number: ".concat(PORT));
var server = http.createServer(app);

var io = _socket["default"].listen(server);

var files = [// Tools and tests
// "libs/tools.js",
// "libs/test.js",
//Base types  
"libs/iterator.js", "libs/dict.js", "libs/tree.js", // Math types    
"libs/group.js", // "libs/tensor.js",
// "libs/vector.js",
"libs/matrix.js", // Visual types
"libs/color.js", "libs/point.js", "libs/figure.js", // "libs/line.js",
"libs/form.js", "libs/basepolygon.js", "libs/segment.js", "libs/polygon.js", "libs/rectangle.js", "libs/square.js", "libs/circle.js", // Physics types
"libs/motion.js", "libs/body.js", "libs/plane.js", "libs/context.js", "libs/entity.js", "libs/manager.js", // Game types
"models/gameentity.js", "models/missile.js", "models/missilegroup.js", "models/life.js", "models/follower.js", "models/shooter.js", "models/asteroid.js", "models/asteroidgroup.js", "models/spaceship.js", "models/spaceshipgroup.js", "models/meteor.js", "models/meteorgroup.js", "models/collider.js", "models/gamemap.js", "models/supergroup.js", "models/game.js", // Entry point
"models/gameserver.js"]; // for (const file of files) {
//     console.log(file);
//     let data = fs.readFileSync(file);
//     let script = new vm.Script(data);
//     script.runInThisContext();
//   }

server.listen(process.env.PORT || 8000);
app.use('/libs', _express["default"]["static"]('libs'));
app.use('/models', _express["default"]["static"]('models'));
app.use('/dist', _express["default"]["static"]('dist'));

var _dirname = _path["default"].resolve();

console.log(_dirname); // var path = __dirname.split("/");
// path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
  res.sendFile(_dirname + "/views/index.html");
});

var game = _game["default"].random(); //console.log(`Le group ${game.group.get('asteroidGroup')}`);


var gameServer = new GameServer(game, io);
gameServer.setUp();
gameServer.main();