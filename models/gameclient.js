export default class GameClient extends Manager {
    static movement = {up: false, down: false, right: false, left: false, zoomin: false, zoomout: false};
    static backgroundColor = "#000000";

    constructor(
        canvas,
        game,
        socket,
    ) {
        super(canvas, game)
        this.socket = socket;
        this.id = null;
        this.mouses = new Map();
    }
    on() {
        this.socket.on('newMissile', function (data) {
            const missile = JSON.parse(data.missile, Game.reviver);
            const missileGroup = this.game.group.get('missileGroup');
            missileGroup.add(missile);
        }.bind(this));
        this.socket.on("oneSpaceshipBody", function (data) {
            const spaceship = this.game.group.get('spaceshipGroup').take(data.uuid);
            spaceship.body.rset(data.body);
        }.bind(this));
        console.log("on écoute les sockets du serv");
        this.socket.on('spaceshipGroup', function (data) {
            const spaceshipGroup = JSON.parse(data, Game.reviver);
            this.game.group.set("spaceshipGroup", spaceshipGroup);
            // console.log("spaceship");
        }.bind(this));
        this.socket.on('spaceshipGroupBodies', function (data) {
            //console.log('spaceshipGroupBodies');
            // console.log(data.bodies);
            this.game.group.get("spaceshipGroup").setBodies(data.bodies);
        }.bind(this));
        this.socket.on('superGroup', function (data) {
            const superGroup = JSON.parse(data, Game.reviver);
            this.game.group  =  superGroup;
        }.bind(this));
        
        this.socket.on('asteroidGroup', function (data) {
            const asteroidGroup = JSON.parse(data, Game.reviver);
            console.log(`On reçois un asteroidGroup`);// ${data}`);
            this.game.group.set('asteroidGroup', asteroidGroup);
        }.bind(this));

        this.socket.on('oneMouseMove', function(data) {
            this.mouses.set(data.uuid, Vector.from(data.mouse));
            console.log(this.mouses);
        }.bind(this));

        this.socket.on('mouses', function (data) {
            const spaceshipGroup = this.game.group.get('spaceshipGroup')
            for (const [k,v] of data.mouses) {
                spaceshipGroup.take(k).follow(Vector.from(v));
            }
        }.bind(this));
        
        const socketID  =  this.socket.id;
        this.socket.on('spaceshipID', function (data) {
            const spaceshipID = data.spaceshipID;
            //console.log(`On reçois l'id : socket.id chez nous : ${socketID} socket id chez serv : ${spaceshipID}`);// ${data}`);
            console.log(`l'id de notre spaceShip ${spaceshipID}`);
            this.id = spaceshipID;
        }.bind(this));

        this.socket.on("summonSpaceship", function (data) {
            //ajoute le vaisseau en 
            //data={uuid: this.socket.id, coordinates: [10,10]}
            const spaceshipGroup = this.game.group.get('spaceshipGroup');
            const spaceship =  Spaceship.random();
            spaceship.form.color = "green";
            spaceship.position = Vector.from(data.coordinates);
            spaceshipGroup.add(data.uuid, spaceship);
            // spaceshipGroup.addSpaceship(data.uuid, spaceship);
        }.bind(this));

        this.socket.on("unsummonSpaceship", function (data) {
            const spaceshipGroup = this.game.group.get('spaceshipGroup');
            spaceshipGroup.remove(data.uuid);
        }.bind(this));

        this.socket.on("spaceship-update", function(data) {
            const spaceshipGroup = this.game.group.get('spaceshipGroup');
            if (data.event=='life-change') {
                const spaceship = spaceshipGroup.get(data.sid);
                spaceship.life.value = data.life;
            } else if (data.event=='removing') {
                spaceshipGroup.delete(data.sid);
            }
        }.bind(this));
    }
    get player() {
        const spaceshipGroup = this.game.group.get('spaceshipGroup');
        return spaceshipGroup.take(this.id);
    }
    get spaceship() {
        const spaceshipGroup = this.game.group.get('spaceshipGroup');
        return spaceshipGroup.take(this.id);
    }
    show() {
        const player = this.player;
        if (player) {
            this.context.plane.position = player.position;
        }
        super.show();
    }
    update() {
        const player = this.player;
        if (player) {
            player.follow(this.context.fromScreen(this.mouse));
            // this.socket.emit("spaceshipBody", {body: player.body});
            this.socket.emit("mouseMove", {mouse: Array.from(this.context.fromScreen(this.mouse))});

        }
        // console.log('update');
        this.followAllMouses();
        super.update()
    }
    followAllMouses() {
        const spaceshipGroup = this.game.group.get('spaceshipGroup');
        for (const [k,v] of this.mouses) {
            spaceshipGroup.take(k).follow(v);
        }
    }



    onKeyDown(e) {
        super.onKeyDown(e);
        if (this.id === null) {
            //on n'a pas encore de spaceship
            console.log(`Vous n'avez pas encore de spaceship !`);
            return false;
            }
        if (e.code  ==  'Space') {
            const missile = this.player.shoot();
            this.game.group.get('missileGroup').add(missile);
            const data = JSON.stringify(missile, Game.replacer);
            this.socket.emit("missile", {missile:data});
        }
    }
    // onMouseMotion(e) {
    //     super.onMouseMotion(e);
    //     this.socket.emit("mouseMove", {mouse: Array.from(this.context.fromScreen(this.mouse))});
    // }
    start() {
        super.start()
        this.on()
    }
    main() {
        this.start();
        setInterval(this.loop.bind(this), 20);
    }
    
    //     let player = this.game.map.group.playerGroup.map.get(this.id);
    //     if (player) {
    //         if (!player.alive) {
    //             console.log("you are dead");
    //             this.socket.emit("player-respawn");
    //         }
    //     }
        
    //     if ('id' in this) {
    //         this.game.map.group.collideClient(this.id);
    //     }
    //     if (this.game.map.group.cache.size>0) { // could overrun the server
    //         this.socket.emit(
    //             "cache",
    //             JSON.stringify(this.game.map.group.cache, Game.replacer)
    //         );
    //         this.game.map.group.cache.clear();
    //     }
    //     this.socket.emit("control-mousemove", this.context.fromScreen(this.mouse));
    // }    
}