

const story1 = "The fierce $ENEMYTYPE ambushed $PLAYERNAME from behind $TILE_ENVIRONMENT";

function story1(enemyType, playerName, tileEnvironment){
    return `The getCreatureDescription() ${enemyType} getOffensiveVerb() ${playerName} from behind ${tileEnvironment}`;
}