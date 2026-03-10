class Attack {
    
    static all_attacks = {};

    static fill_attacks() {
        for (let move of fast_moves) {
            Attack.all_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], move["type"], move["power"], move["duration"])
        }
        
        for (let move of charged_moves) {
            Attack.all_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], move["type"], move["power"], move["duration"])
        }
    }

    constructor(id, name, type, power, duration) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    toString() {
        console.log(this.name + " : #" + this.id + ", " + this.type + ", " + this.power + ", " + this.duration + "ms");
    }
}

Attack.fill_attacks();