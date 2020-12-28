//Today I was strolling through a lush grove of trees and saw a lonely cottage in the distance. What a nice day it was!
//Today I was galloping next to a loud river and saw nothing but a sodding stack of rocks in the distance. Truly a miserable time to be alive.
//As the day was drawing to a close. I overheard a squealing boar hiding behind a burnt estate. Best stay away from all that.

tileFeature1 = random(tileFeatures)
tileFeature2 = random(tileFeatures)
grasslands1 = "Today I was " + random(moveType) + random(tileFeature1.moveType) + random(tileFeature1.descriptions) + tileFeature1.name + " and saw a " + random(tileFeature2.descriptions) + tileFeature2.name + " in the distance. " + random(finishingPoints);

tileFeature1 = random(tileFeatures)
tileFeature2 = random(tileFeatures)
grasslands2 = "As the day was drawing to a close. I " + random(discoveryType) + " a " + random(tileFeature.description) + tileFeature.name + " hiding behind a " + random(tileFeature2.description) + random(tileFeature2.names) + random(finishingPoints);

moveType = ["running", "galloping", "strolling", "running", "hurrying"]

discoveryType = ["noticed", "saw", "overheard"];

finishingPoints = ["What a nice day it was!", "Truly a miserable time to be alive", "Best stay away from all that"]

tileFeatures = [River, GroveOfTrees, StackOfRocks, Cottage, Boar]

River = {
    descriptions: ["calm and deep", "wild", "loud"],
    moveType: ["along a", "next to a"],
    name: "river"
}

GroveOfTrees = {
    descriptions: ["lush", "gnarly", "bushy"],
    moveType: "through a",
    name: "grove of trees"
}

StackOfRocks = {
    descriptions: ["nothing but a sodding", "large", "small"],
    name: "stack of rocks"
}

Cottage = {
    descriptions: ["lonely", "large", "burnt"],
    names: ["cottage", "house", "estate"]
}

Boar = {
    descriptions: ["fat", "rugged", "squealing"],
    name: "Boar"
}