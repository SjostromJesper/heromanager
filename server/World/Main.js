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
const Dice = require('../Dice/Dice.js');

const CombatSimulator = require("../Combat/CombatSimulator.js")

definePerlin(globalThis);
decisionsList(globalThis);
tileIds(globalThis);
itemLabels(globalThis);

//test dice
let dice = new Dice(6);
console.log(dice);
console.log("Test d6: " + dice.roll);

//test combat
CombatSimulator.testCombat();

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

let world = null;
let farmerJoe = new Farmer("", "", "", 25, 25);

function start() {
    return;
    //our random map generator needs a seed
    let seed = Math.random();
    let loggedInUsers = new Map(); //map user session to a character id or something
    console.log("Map generator using seed: " + seed);
    noise.seed(seed);

    //world ids as x-y coordinates (as we're probably going to place worlds next to each other)
    db.loadWorld(0, 0, loadedWorld => {

        world = loadedWorld;
        console.log("Loaded world")
        console.log(world);

        //construct the world if loading yielded nothing
        if (!world) {
            console.log("No existing world");
            world = new World();

            world.worldTiles = new WorldBuilder().getSmartWorld();


            console.log(farmerJoe.getName() + " has 200 hunger");
            farmerJoe.getCreatureStatus().setHunger(300);

            world.addCreature(farmerJoe);
        }

        function populateCreatureTick(creature) {
            let creatureTick = new CreatureTick();
            let creatureTile = world.worldTiles[creature.coordinate.x][creature.coordinate.y];
            creatureTick.setWorld(world);
            creatureTick.setActingCreature(creature);
            creatureTick.setCreatureTile(creatureTile);
            creatureTick.setRandomEncounter(creatureTile.getRandomEvent());
            return creatureTick;
        }

        gameHttp.listen(3001, () => {
            console.log("up")
            setInterval(() => {

                for (let keyValue of world.creatures) {
                    let start = new Date().getMilliseconds();

                    let creature = world.creatures.get(keyValue[0]);

                    //populate the creature tick so we can pass it around
                    let creatureTick = populateCreatureTick(creature);

                    //some stuff that will happen every tick, like growing more hungry
                    creature.hungerTick();
                    creature.updateKnownTiles(creatureTick);

                    //creature makes a decision
                    let decision = creature.makeDecision(creatureTick);
                    console.log("Creature made decision " + decision.constructor.name)

                    //performs the decision
                    decision.perform(creatureTick);

                    if (creature.isDead()) {
                        console.log(creature.getName() + " died");
                        world.removeCreature(creature);
                    }

                    console.log("one tick took " + (new Date().getMilliseconds() - start) + " ms")
                }

                //TODO persist world
                //db.persistWorld(0, 0, world);

            }, 1000) //TODO WARNING WORLD PERSISTS AT EVERY TICK, DON'T SET A VERY LOW TICK VALUE
        });
    });


}

function googleLogin() {
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
}

gameIo.on('connection', (gameSocket) => {
    console.log("new game connection");

    gameSocket.on("login", emailPass => {
        console.log("attempt login")
        console.log(emailPass)
        db.getUser(emailPass.email, user => {
            let valid = user.validatePassword(emailPass.password);
            if (valid) {
                gameSocket.emit("loginSuccess", user);
            } else {
                gameSocket.emit("loginFailure", user);
            }
        });
    });

    gameSocket.on("getWorld", parameter => {
        console.log("getWorld")
        let colorMatrix = new MapDrawer().drawMap(world, farmerJoe);
        gameSocket.emit("world", colorMatrix);
    });

    gameSocket.on("getPlayer", param => {
        gameSocket.emit("player", world.getCreature(farmerJoe.getId()));
    });
    gameSocket.on("facebookLogin", parameter => {

    });

    gameSocket.on("googleLogin", parameter => {
        //googleLogin();
        console.log("hello?")
        const passport = require('passport');
        const LocalStrategy = require('passport-local').Strategy;
        passport.use(new LocalStrategy({
                usernameField: 'login',
                passwordField: 'password'
            },
            function (username, password, done) {
                console.log("local strategy completed")
                // User.findOne({ username: username }, function (err, user) {
                //     if (err) { return done(err); }
                //     if (!user) { return done(null, false); }
                //     if (!user.verifyPassword(password)) { return done(null, false); }
                //     return done(null, user);
                // });
            }
        ));
    });

    gameSocket.on("twitterLogin", parameter => {

    });

    gameSocket.on("appleLogin", parameter => {

    });
});


db.startServer(start);
