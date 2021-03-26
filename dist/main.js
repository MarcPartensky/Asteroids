/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./models/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./models/client.js":
/*!**************************!*\
  !*** ./models/client.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"import Tensor from '../libs/tensor.js';\\nimport Vector from '../libs/vector.js';\\nimport Matrix from '../libs/matrix.js';\\nimport Motion from '../libs/motion.js';\\nimport Body from '../libs/body.js';\\n\\nimport Point from '../libs/point.js';\\nimport Figure from '../libs/figure.js';\\nimport Form from '../libs/form.js';\\nimport BasePolygon from '../libs/basepolygon.js';\\nimport Square from '../libs/square.js';\\nimport Rectangle from '../libs/rectangle.js';\\nimport Segment from '../libs/segment.js';\\nimport Polygon from '../libs/polygon.js';\\n\\nimport Life, {LifeBar} from './life.js';\\nimport Follower from './follower.js';\\nimport Shooter from './shooter.js';\\n\\nimport Spaceship from './spaceship.js';\\nimport Missile from './missile.js';\\nimport Asteroid, {AsteroidForm} from './asteroid.js';\\nimport Meteor from './meteor.js';\\n\\nimport Group from '../libs/group.js';\\nimport SuperGroup from './supergroup.js';\\nimport SpaceshipGroup from './spaceshipgroup.js';\\nimport MissileGroup from './missilegroup.js';\\nimport AsteroidGroup from './asteroidgroup.js';\\nimport MeteorGroup from './missilegroup.js';\\n\\nimport GameMap from './gamemap.js';\\nimport { SuperCollider,MissileSpaceshipCollider} from './collider.js';\\n\\n\\nvar canvas = document.getElementById(\\\"canvas\\\");\\n\\nvar context = new ContextAdapter(canvas.getContext(\\\"2d\\\"));\\n\\n\\ncontext.width = canvas.width = window.innerWidth;\\ncontext.height = canvas.height = window.innerHeight;\\n\\ncontext.plane.units.position = new Vector(0.2, 0.2);\\n\\n// var name = prompt(\\\"name\\\");\\nvar host = String(document.location);\\nvar socket = io.connect(host) //, {query: \\\"name=\\\"+name});\\n\\n\\n\\n// var group = SuperGroup.random();\\n// var game = new Game(group);\\nvar game = Game.random();\\n\\n\\n\\ngameClient = new GameClient(canvas, game, socket)\\n\\ngameClient.main();\\n\\n\");\n\n//# sourceURL=webpack:///./models/client.js?");

/***/ })

/******/ });