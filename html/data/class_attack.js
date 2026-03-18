class Attack {
    
    static all_attacks = {};

    static fill_attacks() {
        for (let move of fast_moves) {
            Attack.all_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], Type.all_types[move["type"]], move["power"], move["duration"])
        }
        
        for (let move of charged_moves) {
            Attack.all_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], Type.all_types[move["type"]], move["power"], move["duration"])
        }
    }

    static get_attack_by_name(attack_name) {
        for (let attack_id in this.all_attacks) {
            if (attack_name.toUpperCase() == this.all_attacks[attack_id].name.toUpperCase()) {
                return this.all_attacks[attack_id];
            }
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
        return this.name + " : #" + this.id + ", " + this.type + ", " + this.power + ", " + this.duration + "ms";
    }
}