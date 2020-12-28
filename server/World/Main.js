const mongoose = require('../database/MongoDB.js')
const db = new mongoose();


const World = require('./World.js');
const WorldBuilder = require('./WorldBuilder.js');
const Farmer = require('../Creatures/Farmer.js');
const definePerlin = require('./perlin.js');
const MapDrawer = require('./MapDrawerServer.js');

const decisionsList = require('../AI/Decisions/DecisionList.js');
const CreatureTick = require('./CreatureTick.js');
const tileIds = require('./Tiles/TileIds.js');
const itemLabels = require('../Items/ItemLabels.js');
const NameGenerator = require('../Generators/NameGenerator.js');

definePerlin(globalThis);
decisionsList(globalThis);
tileIds(globalThis);
itemLabels(globalThis);


//our random map generator needs a seed
let seed = Math.random();
console.log("Map generator using seed: " + seed);
noise.seed(seed);

let world = new World();
world.worldTiles = new WorldBuilder().getSmartWorld();

let farmerJoe = new Farmer("", "", "", 25, 25);
console.log(farmerJoe.getName() + " has 200 hunger");
farmerJoe.getCreatureStatus().setHunger(300);

world.addCreature(farmerJoe);

const app = require('express');
const gameHttp = require('http').createServer(app);
const gameIo = require('socket.io')(gameHttp, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["auth", "Access-Control-Allow-Origin"],
        credentials: true
    }
});

function start() {
    db.getAllUsers()
    gameHttp.listen(3001, () => {
        console.log("up")
        setInterval(() => {

            for (let keyValue of world.creatures) {
                let creature = world.creatures.get(keyValue[0]);

                let creatureTick = new CreatureTick();
                let creatureTile = world.worldTiles[creature.coordinate.x][creature.coordinate.y];

                creature.hungerTick();
                creatureTick.setWorld(world);
                creatureTick.setActingCreature(creature);
                creatureTick.setCreatureTile(creatureTile);
                creatureTick.setRandomEncounter(creatureTile.getRandomEvent());

                let decision = creature.makeDecision(creatureTick);

                decision.perform(creatureTick);

                if (creature.isDead()) {
                    console.log(creature.getName() + " died");
                    world.removeCreature(creature);
                }
            }

        }, 10000)
    });
}

gameIo.on('connection', (gameSocket) => {
    console.log("new game connection");
    gameSocket.on("getWorld", parameter => {
        console.log("getWorld")
        let colorMatrix = new MapDrawer().drawMap(world);
        gameSocket.emit("world", colorMatrix);
    });

    gameSocket.on("getPlayer", param => {
        gameSocket.emit("player", world.getCreature(farmerJoe.getId()));
    });
    gameSocket.on("facebookLogin", parameter => {

    });

    gameSocket.on("googleLogin", parameter => {
        console.log("google login attempt")
        const passport = require('passport');
        const GoogleStrategy = require('passport-google-oauth20').Strategy;
        //const mongoose = require('mongoose');
        const keys = require('../config/keys.js');
        //const User = require("your_user_model_file_path");

        passport.use(
            new GoogleStrategy({
                clientID: keys.google.clientID,
                clientSecret: keys.google.clientSecret,
                callbackURL: '/auth/google/redirect'
            }, (accessToken, refreshToken, profile, done) => {
                console.log("authenticated google user " + profile.id);
                // passport callback function

                //check if user already exists in our db with the given profile ID
                // User.findOne({googleId: profile.id}).then((currentUser)=>{
                //     if(currentUser){
                //         //if we already have a record with the given profile ID
                //         done(null, currentUser);
                //     } else{
                //         //if not, create a new user
                //         new User({
                //             googleId: profile.id,
                //         }).save().then((newUser) =>{
                //             done(null, newUser);
                //         });
                //     }
                // })
            })
        );
    });

    gameSocket.on("twitterLogin", parameter => {

    });

    gameSocket.on("appleLogin", parameter => {

    });
});



db.startServer(start());
