import EventEmitter from 'events';
var ping = 0;

export class Player {
    constructor(id) {
        this.id = id;
        this.update = new EventEmitter();//Utilise par SockCom/SockClient pour les socket
        this.mouse = Vector.zero2;
        //this.update.emit("lifeUpdate", this.life.value);
    }
    join() {
                //ajoute le vaisseau de this dans le jeu
    }
    
    left() {
                //retire le vaisseau du joueur
    }
}



export class socketClient {
        //se trouve côté server. Une instance de socketClient par onglet du jeu
    constructor(socket, gameServer) {
        this.socket = socket;
        this.player  = new Player(this.socket.id);//fabrication d'une instance Player pour notre client
        this.gameServer = gameServer;
    }

    connect() {
        //lancée quand l'objet se connecte au serveur
        const spaceshipGroup = this.gameServer.game.group.get('spaceshipGroup');
        spaceshipGroup.add(this.socket.id, Spaceship.random());
        this.socket.emit("spaceshipID", { spaceshipID: this.socket.id });
        this.player.join();
        this.registerPlayerEvent(this.player);
        this.on(); 
        const superGroup = this.gameServer.game.group;
        //hipGroup  = this.gam erver.game.group.get("spaceshipGroup")
        //const asteroidGroup = this.gameServer.game.group.get("asteroidGroup");

        //const str = JSON.stringify(group, Game.replacer);
        //console.log(`On envoie à ${this.socket.id} le groupe de ${str.length} caractère.`); //superGroup : ${str}`);
        //this.socket.emit("superGroup", str);
        const data = JSON.stringify(superGroup, Game.replacer)
        this.socket.emit("superGroup", data);//le nouveau joueur reçois son spaceship ici

        for (let so_id in this.gameServer.socketList) {//todo faire un truc async et utiliser broadcast
            if (so_id != this.socket.id) {
                this.gameServer.socketList[so_id].socket.emit("summonSpaceship", {uuid: this.socket.id, coordinates: [0,0]})//todo

            } 
        }
    }
    get spaceship() {
        return this.gameServer.game.group.get('spaceshipGroup').take(this.socket.id);
    }
    disconnect() { 
        //quand l'objet se déconnecte du serveur
        this.player.left();
        const spaceshipGroup = this.gameServer.game.group.get("spaceshipGroup")
        spaceshipGroup.remove(this.socket.id);
        this.gameServer.sendAll("unsummonSpaceship", {uuid:this.socket.id});
        
    }
    
    on() {
        //permet de recevoir les commandes envoyée par le joueur
        if (this.player === undefined || this.player === null) {
            console.log("on essai de iniSocketAPI alors que le joueur est pas co :/");
        }
        // const player = this.player;
        this.socket.on("message", function (message) {
            console.log(message);
            this.socket.emit("message", message);
        });
        this.socket.on("mouseMove", function (data) {
            this.player.mouse.set(data.mouse);
            // this.socket.broadcast.emit("oneMouseMove", {uuid:this.socket.id, mouse:data.mouse});
            // console.log(data.mouse)
            // const spaceship = this.gameServer.game.group.get('spaceshipGroup').take(this.socket.id);
            // if (spaceship) {
            //     spaceship.follow(Vector.from(data.mouse));
            //     this.gameServer.sendAll("oneSpaceshipBody", {body: spaceship.body, uuid: this.socket.id});
            // }
        }.bind(this));

        this.socket.on("spaceshipBody", function(data) {
            this.spaceship.body.rset(data.body);
        }.bind(this));

        this.socket.on("missile", function (data) {
                        //le client a envoyé un missile
                        //todo : vérif que le client respecte les cooldown
            // console.log(`le client envoi un missile`);
            const missile = JSON.parse(data.missile, Game.reviver);
            // console.log(missile);
            this.gameServer.game.group.get('missileGroup').add(missile);    
            // console.log(this.gameServer.game.group.get('missileGroup'));
            this.socket.broadcast.emit("newMissile", data);
        }.bind(this));
    }

    registerPlayerEvent(player) {
        //permet d'annnoncer à tous les joueurs des updates
        const socket = this.socket;
        // const player = this.player;
        const myGameServer = this.gameServer;
        player.update.on("coordinatesUpdate", function (data) {
            //console.log("coordinatesUpdate event", data);
            myGameServer.sendAll("coordinatesUpdate", { uuid: player.id, coordinates: data.coordinates });
        });

        player.update.on("directionUpdate", function (data) {
            //console.log("directionUpdate event", data);
            myGameServer.sendAll("directionUpdate", { uuid: player.id, direction: data.direction });
        });

        player.update.on("unsummonPlayer", function (data) {
            myGameServer.sendAll("unsummonPlayer", { uuid: data.uuid });
        });

        player.update.on("summonPlayer", function (data) {
            myGameServer.sendAll("summonPlayer", { name: data.name, uuid: data.uuid, coordinates: data.coordinates });
        });
    }
    
   
    
    

}


export default class GameServer {
    constructor(game, io) {
        this.game = game;
        this.socketList = {};
        this.io = io;
        this.eventEmitter = new EventEmitter(); // intern event emitter
    }

    setUp() {
        //A lancer lors du démarrage du server
        this.initUpdate();
        this.acceptConnection();
    }

    sendAll(event, message) {//todo utiliser les boradcasts https://socket.io/docs/#Broadcasting-messages
        for (let so_id in this.socketList) {//todo faire un truc async
            this.socketList[so_id].socket.emit(event, message);
        }

    }
    
    
    acceptConnection() {
        //demande au seveur d'accepter les connexions des clients
        console.log(`On écoute les connexions des clients`);
        this.io.sockets.on("connection", function (socket) {
            const id = socket.id;
                  
            console.log(`Nouveau client d'id ${JSON.stringify(id)}`);
            this.socketList[id] = new socketClient(socket, this);
            this.socketList[id].connect();
            socket.on("disconnect", function () {
                console.log(`Deconnexion client d'id ${JSON.stringify(id)}`);
                this.socketList[id].disconnect();  
                delete this.socketList[id];
            }.bind(this));
        }.bind(this));
    }

    initUpdate() {
        this.eventEmitter.on("spaceship-update", function(data) {
            this.sendAll("spaceship-update", data);
        }.bind(this));
        //A lancer au lancement du serveur, permet d'informer les clients des dernières news
        //this.game.on("Event Update News !!",  function (data)  {
        //    console.log("event caught by GameServer !!");
        //    this.sendAll("Update de la mort", { param1: "ciao les losers", param2: "toujours pour décrire l'update" });
        //});
    }
    update() {
        this.follow();
        // this.sendMouses();
        this.game.update();
        this.game.collide();
    }
    sendMouses() {
        const mouses = [];
        for (const id in this.socketList) {//todo faire un truc async
            mouses.push([id, this.socketList[id].player.mouse]);
        }
        this.sendAll("mouses", {mouses: mouses});
    }
    follow() {
        let socket, spaceship;
        for (const id in this.socketList) {
            socket = this.socketList[id]
            spaceship = socket.spaceship;
            if (spaceship) { // spaceship might die.
                spaceship.follow(socket.player.mouse);
            }
        }
    }
    loop() {
        this.update();
    }
    start() {
        console.log("starting the game");
        this.game.collider.initCollisionListener(this.eventEmitter);
    }
    main() {
        this.start();
        // console.log(this.game.dt*100);
        // this.game.dt = 0.3;
        setInterval(this.loop.bind(this), 20);
        setInterval(this.streamSpaceshipGroupBodies.bind(this), 20);
    }
    streamSpaceshipGroupBodies() {
        const spaceshipGroup = this.game.group.get('spaceshipGroup');
        this.sendAll('spaceshipGroupBodies', {bodies: spaceshipGroup.getBodies()});
    }
}