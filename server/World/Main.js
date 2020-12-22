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
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["auth", "Access-Control-Allow-Origin"],
        credentials: true
    }
});

http.listen(3001, () => {
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

        //mapDrawer.drawMap(World);
    }, 5000)

});

io.on('connection', (socket) => {
    // either with send()
    console.log("client connected");
    socket.on("functionName", parameter => {
        let colorMatrix = new MapDrawer().drawMap(world);
        socket.emit("world", colorMatrix);
    });
});



