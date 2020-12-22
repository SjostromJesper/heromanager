/**
 * see {@link NameGenerator#NameGenerator(String[], String[], String[])}
 *
 * @param vocals
 * @param startConsonants
 * @param endConsonants
 * @param nameInstructions
 * Use only the following letters:
 * (v=vocal,c=startConsonsonant,d=endConsonants)! Pass something
 * like {"vd", "cvdvd", "cvd", "vdvd"}
 */
module.exports = class NameGenerator {
    constructor(vocals = [], startConsonants = [], endConsonants = [], nameInstructions = []) {
        this.vocals = vocals;
        this.startConsonants = startConsonants;
        this.endConsonants = endConsonants;
        this.nameInstructions = nameInstructions;
    }

    getName(){
        let name = "";
        let nameInstruction = this.getRandomElementFrom(this.nameInstructions);
        let l = this.nameInstructions.length;

        while(nameInstruction.length > 0){
            let x = nameInstruction.charAt(0);
            switch (x) {
                case 'v':
                    name += this.getRandomElementFrom(this.vocals);
                    break;
                case 'c':
                    name += this.getRandomElementFrom(this.startConsonants);
                    break;
                case 'd':
                    name += this.getRandomElementFrom(this.endConsonants);
                    break;
            }
            nameInstruction = nameInstruction.substring(1);
        }
        return this.up(name);
    }

    getElfNameGenerator(){
        //v
        const vocals = ["a", "a", "a", "va", "e", "i", "o", "u"];

        //c
        const startConsonants = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "r", "s", "t", "v", "th"];

        //d
        const endConsonants = ["b", "d", "f", "g", "h", "k", "l", "ll", "m", "mm", "n", "p", "r", "s", "t", "v", "ck"];

        const nameInstructions = ["vvdvd", "vcvd", "vdvd", "vcvv", "vcvccvd", "vddvd", "vvcvdvdv", "vvcvdv", "vvdvdv", "vvvccvdv"];

        return new NameGenerator(vocals, startConsonants, endConsonants, nameInstructions);
    }

    getOrcNameGenerator(){
        //v
        const vocals = ["a", "o", "u"];

        //c
        const startConsonants = ["b", "c", "d", "g", "k", "l", "r", "s", "t", "th"];

        //d
        const endConsonants = ["b", "d", "f", "g", "h", "k", "n", "p", "r", "rk", "t", "v", "ck"];

        const nameInstructions = ["cvdvd", "cvd", "cvv", "cvccvd", "cvdvdv", "cvdv", "cvccvdv"];

        return new NameGenerator(vocals, startConsonants, endConsonants, nameInstructions);
    }

    up(name){
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    getRandomElementFrom(v = []){
        return v[Math.floor(Math.random() * v.length)]
    }
}


