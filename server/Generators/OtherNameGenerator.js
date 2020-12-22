module.exports = class OtherNameGenerator {
    constructor(names, adjectives, conjunctions, nouns, pluralNouns) {
        this.names = names;
        this.adjectives = adjectives;
        this.conjunctions = conjunctions;
        this.nouns = nouns;
        this.pluralNouns = pluralNouns;
        this.nameBuilders = this.getNameBuilders();
    }

    up(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    Up(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    getRandomElementFrom(v = []) {
        return v[Math.floor(Math.random() * v.length)]
    }

    RandomString(v = []){
        return this.getRandomElementFrom(v);
    }

    getRandomName() {
        let nameFunction = this.getRandomElementFrom(this.nameBuilders);
        return nameFunction().join(" ");
    }


    getDemonNameGenerator() {
        let adjectives =
            [
                "fierce", "aged", "ancient", "autumn", "billowing", "bitter", "black", "blue", "bold",
                "broad", "broken", "calm", "cold", "cool", "crimson", "curly", "damp",
                "dark", "dawn", "delicate", "divine", "dry", "empty", "falling", "fancy",
                "flat", "floral", "fragrant", "frosty", "gentle", "green", "hidden", "holy",
                "icy", "jolly", "late", "lingering", "little", "lively", "long", "lucky",
                "misty", "morning", "muddy", "mute", "nameless", "noisy", "odd", "old",
                "orange", "patient", "plain", "polished", "proud", "purple", "quiet", "rapid",
                "raspy", "red", "restless", "rough", "round", "royal", "shiny", "shrill",
                "shy", "silent", "small", "snowy", "soft", "solitary", "sparkling", "spring",
                "square", "steep", "still", "summer", "super", "sweet", "throbbing", "tight",
                "tiny", "twilight", "wandering", "weathered", "white", "wild", "winter", "wispy",
                "withered", "yellow", "young", "teeming", "wretched", "dark", "black", "evil"
            ];
        let conjunctions =
            [
                "of the", ", from the", ", lord of", ", lord of the", ", savior of",
            ];

        let nouns =
            [
                "justice", "hope", "bar", "bird", "block", "boat", "bonus",
                "bread", "breeze", "brook", "bush", "butterfly", "cake", "cell", "cherry",
                "cloud", "darkness", "dawn", "dew", "disk", "dream", "dust",
                "feather", "field", "fire", "firefly", "flower", "fog", "forest", "frog",
                "frost", "glade", "glitter", "grass", "hall", "hat", "haze", "heart",
                "hill", "king", "lab", "lake", "leaf", "limit", "math", "meadow",
                "mode", "moon", "morning", "mountain", "mouse", "mud", "night", "paper",
                "pine", "poetry", "pond", "queen", "rain", "recipe", "resonance", "rice",
                "river", "salad", "scene", "sea", "shadow", "shape", "silence", "sky",
                "smoke", "snow", "snowflake", "sound", "star", "sun", "sun", "sunset",
                "surf", "term", "thunder", "tooth", "tree", "truth", "union", "unit",
                "violet", "voice", "water", "water", "waterfall", "wave", "flower", "wind",
                "wood", "destroyer", "splitter", "ripper", "twilight"
            ];

        let pluralNouns = [
            "bars", "birds", "blocks", "boats",
            "bread", "breezes", "brooks", "bushes", "butterflies", "cakes", "cells", "cherries",
            "clouds", "darkness", "dawns", "dreams", "dust",
            "feathers", "fields", "fires", "fireflies", "flowers", "fog", "forests", "frogs",
            "frost", "glades", "glitter", "grass", "hats", "hazes", "hearts",
            "hills", "kings", "lakes", "leaves", "limits", "meadows",
            "moons", "mornings", "mountains", "mice", "mud", "nights",
            "ponds", "queens", "rain", "rice",
            "rivers", "salads", "scenes", "seas", "shadows", "shapes", "silence", "skies",
            "smoke", "snow", "snowflakes", "sounds", "stars", "sunsets",
            "term", "thunder", "teeth", "trees", "truth",
            "voices", "water", "waterfall", "waves", "flowers", "winds",
            "woods",
        ];
        let demonNames =
            ["Abalam", "Abbadon", "Abaddon", "Abi", "Abizo", "Dybbuk", "Abraxas", "Agira", "Agrith-Naar", "Aguilar", "Agwel", "Aku", "AlEnna", "Alastair", "Alastor", "Algaliarept", "Alichino", "Amaimon", "Amel", "Amon", "Amon", "Andariel", "Andurium", "Anthony", "Anyanka", "Anzu", "Archimonde", "Arlon", "Artery",
                "Ashtar", "Asmodeus", "Asmodeus", "Asmodeus", "Asmodeus", "Asmoranomardicadaistinaculdacar", "Asmoth", "Astaroth", "Astaroth", "Asura", "Aurora", "Azal", "Azal", "Azazeal", "Azazel", "Azazel", "Azazel", "Azazel", "Azazel", "Azazello", "Azmodan", "Azrael", "AzzieElbub", "Baal", "Babau", "Bacarra",
                "BadAsh", "Baghul", "Bahumat", "Bai'Tza", "Bal'lak", "Balnazzar", "Balor", "Balrog", "Balthazae", "Balthazar", "Balthazar", "Bambadjan", "Banshee,", "Baphomet", "Barakiel", "Barbariccia", "Barbas", "Barthamus", "Bartimaeus", "Batibat", "Bat'Zul", "Bawoo", "Mrs.Baylock", "Beast",
                "Beastie", "Behemoth", "Bebilith", "Beelzeboss", "Beelzebub", "Beelzebub", "Bela", "Beleth", "Belfagor", "Belial", "Belphegor", "Belthazor", "BEN", "Bendy", "Berial", "Betra", "Big Horn", "Blackheart", "BlazeJohnny", "Bojack", "Boogeyman,", "Brady", "Bubby", "Bugo",
                "Cacodemon", "Cadaver", "Cagnazzo", "Cailleach", "Cain", "Calcabrina", "Calcifer", "Callamudre", "Cameron Briel", "Candyman", "Canterbury", "CaptainHatch", "Carnifex", "Casey", "Castor", "Caad", "Catch", "Carine", "Cecily", "Charlie", "ChrisBaker", "Chernabog", "Chthon", "Chzo",
                "Ciriatto", "Claude Faustus", "Clavicus Vile", "Count Lupus", "Cowhead", "Crowley", "Crum", "Cryto", "Cyberdemon", "Hoffryn", "Dabura", "Dagda'Mor", "Dagmar", "Dagon", "Dahak", "DaiGui", "Damien Thorn", "Dante", "Dark Heart", "Dark Nebula", "Dark One", "Darkar", "Deadites",
                "Dean", "Decarbia", "Delrith", "DemonSnake", "Demoninja", "Demonita", "Demons", "DeviDevi", "Diablo", "Dipper", "Djinn", "Doviculus", "Doyle", "Draghinazzo", "Drago", "Drawcia", "Dretch", "Drexel", "Druaga", "Dubyukk", "Duke", "Dumain", "Dunamez",
                "Duncan", "Duriel", "Eddie", "EdgarReese", "Elyse", "Endermen", "Eraser", "Errtu", "Etna", "Etrigan", "Evil", "Fallen", "Faquarl", "Farfarello", "Fecor", "Femur", "Firebrand", "FootMystics", "Forbesii", "Furfur", "Furies",
                "Fyrus", "Gaap", "Gahrumble", "Gary", "Gayle", "Gerald", "Ghirahim", "Ghoulies", "Ghouls", "Glabrezu", "Glashan", "Gloamglozer", "Gnoolies", "GodHand", "Gothmog", "Gozer", "Grab",
                "Gregor", "Griever", "Griselbrand", "Guthrie", "Haden", "Halfrek", "Hannah Anafeloz", "Harrington", "Har'lakk", "Hastur", "Hastur", "Hecaitomix", "HelHarington", "HellKnight", "Hellboy", "Henrietta Knowby",
                "Herobrine", "HessianHorseman", "Hex", "Hexxus", "Hezrou", "Hiei", "Hnikarr", "Hyraaq Tobit", "Iblis", "Ifrit", "Illidan", "Infernal", "InuYasha", "Iterennt", "Izual",
                "Jabberwocky", "Jabor", "JackFerriman", "Jael", "JakabokBotch", "Jan Valek", "Janemba", "Japhrimel", "Jaraxxus", "Jervis", "Jiekins", "JoeyAtkins", "JosefelZatanos", "Juiblex", "Jungler", "Tsutsaroth", "KaaJinn", "Kagura", "Kal'GerWarmonger",
                "Kappa Tengu", "KayakoSaeki", "Ke'Oth", "Khorne", "Kildor", "Killabilly", "Bob", "Kip", "Kneesocks", "Koakuma", "Koroviev", "Korrok", "Kragos", "Krampus", "Kronos", "Krul", "Satrina", "Kurama", "Laciel", "Laharl", "Lamia", "Landscaper",
                "Leviathan", "Libicocco", "Ligur", "Lilith", "Lilith", "Lilith", "Lilith", "Lilith", "LittleHorn", "Little Nicky", "LittleOldMan", "Loc-Nar", "Loki", "Lokii", "Lola", "Longhorn Golkonda", "LordLoss", "LordTirek,", "Lorne", "Luci",
                "Lucifer", "Lucifuge Rofocal", "Lucius", "Maarg", "Madam Butterfly", "Madam Styx", "Maderas", "Maildaemon", "MajinBoo", "Majora", "Mal'Ganis", "Malacoda", "Malebolgia", "Maledict", "Malfegor", "Malice", "Malhyne", "Mama", "Mammon",
                "Mammon", "Mancubus", "Mannoroth", "Mara", "Marbas", "Marilith", "Mary Shaw", "Masselin", "Mathias", "Mazikeen", "Mega Satan", "Mehrunes Dagon", "Meliodas",
                "Mephisto", "Mephistopheles", "Mephistroth", "Mercutio", "Michael", "Milan", "Minion", "Minos", "Mourn", "Mundus", "NadiaMoore", "Nalfeshnee", "Nanatoo",
                "Narvarog", "Natsu", "Nausizz", "Nebiroth", "Necrodeus", "Nerine", "Nero", "Neuroōgami", "Nevermore", "Newt", "Nightmare", "Nightmare", "Nouda", "Nova", "Nurgle", "Odio", "OldOnes", "Ormendhal", "Oyashiro", "Paimon",
                "Pazuzu", "Peaches", "Piccolo Daimaō", "Pinhead", "Kong", "Psaro", "Quanchi", "Quasami", "Quasit", "Queezle", "Quitoon", "Qwan", "Qweffor", "Rakdos", "Ramiel", "Ramuthra", "Randall Flagg", "Raven",
                "Raul", "Ravira", "Razgriz", "Red", "Red", "RedGuy", "Retriever", "Rias Gremory", "Rin Okumura", "Ronove", "Rosier", "Rubicante", "Ruby", "Rufio", "Samael", "Samael", "Samhain", "Sammael", "Sardius",
                "Sargatanas", "Sargeras", "Satan", "Satan", "Satan", "Satan", "Satan", "Savanti Romero", "Scanty", "Scarmiglione", "Screwtape", "Scumspawn", "Sebastian Michaelis", "Seloth", "Serguthy", "Sesshomaru", "ShadowMen",
                "Shawn", "Sierra", "Simmons", "Shax", "Shendu", "Silitha", "Simon Cartwright", "Skeletron", "Slaanesh", "Sparda", "Spawn", "Spine", "Straga", "Sven Golly", "Stygian", "Sylathus", "Sytry", "TakeoSaeki", "Tathamet", "TallMan", "TallMan",
                "Tash,", "TavyMord", "TchangZu", "Tchernabog", "Teā", "Tempus", "Terrorblade", "Thammaron", "Omega", "Overlord", "Thompson", "Thulsa Doom", "Thura", "Tiamat", "Timber", "To'Kash", "Toby", "TonyReno", "Trevor", "Tritannus", "Trigon", "Trish",
                "TsoLan", "Turok-Han", "Tzeentch", "Ungoliant", "Valek", "Varrigal", "Vein", "Vergil", "Vicky Sengupta", "Void", "Valtor", "Vordred", "Vrinz Clortho", "Vrock", "Vulgrim", "Vulpuz", "Vyers", "Warlock", "Wendigo,", "Wingar",
                "Woland", "Wormwood", "Xiao Fung", "Xypos", "Yaksha", "Yin-Yarn", "Yk'Lagor", "Yoko Kurama", "Yuuki Terumi", "Zaldover", "Zalgo", "Zamiel", "Zamiel Moloch", "Zankou", "Zann", "Zanshin", "Zdim", "Zelloripus", "Zennon", "Zennon", "Zepar", "Zetta", "Zorc", "Zoxim", "ZoZo",
                "Zuboo", "Zuul"
            ];

        return new OtherNameGenerator(demonNames, adjectives, conjunctions, nouns, pluralNouns);
    }

    getNameBuilders() {
        let nameBuilders = [
            () => {
                return [this.up(this.getRandomElementFrom(this.adjectives)), this.RandomString(this.nouns)];
            },
            //adjective -> noun -> conjunction -> plural noun (Ancient bird of the seas)
            () => {
                return [this.Up(this.RandomString(this.adjectives)), this.RandomString(this.nouns), this.RandomString(this.conjunctions), this.RandomString(this.pluralNouns)];
            },
            // real name -> conjunction -> noun (Abbadon of the fire)
            () => {
                return [this.Up(this.RandomString(this.names)), this.RandomString(this.conjunctions), this.RandomString(this.pluralNouns)];
            },
            // just a name (Abbadon)
            () => {
                return [this.Up(this.RandomString(this.names))];
            },
            // real name -> the -> adjective (Abbadon the little)
            () => {
                return [this.Up(this.RandomString(this.names)), "the", this.RandomString(this.adjectives)];
            },
            // adjective -> noun -> the -> adjective (Ancient bird the lingering)
            () => {
                return [this.Up(this.RandomString(this.adjectives)), this.RandomString(this.nouns), "the", this.RandomString(this.adjectives)];
            }
        ];

        return nameBuilders;
    }
}