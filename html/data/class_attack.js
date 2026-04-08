class Attack {
    
    static charged_attacks = {};
    static fast_attacks = {};

    static fill_attacks() {
        for (let move of fast_moves) {
            Attack.charged_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], Type.all_types[move["type"]], move["power"], move["duration"])
        }
        
        for (let move of charged_moves) {
            Attack.fast_attacks[move["move_id"]] = new Attack(move["move_id"], move["name"], Type.all_types[move["type"]], move["power"], move["duration"])
        }
    }

    static getAttackByName(attack_name) {
        for (let attack_id in this.all_attacks) {
            if (attack_name.toUpperCase() == this.all_attacks[attack_id].name.toUpperCase()) {
                return this.all_attacks[attack_id];
            }
        }
    }

    static get all_attacks() {
        let liste = {};
        
        for (let a in this.charged_attacks) {
            liste[a] = this.charged_attacks[a];
        }
        for (let a in this.fast_attacks) {
            liste[a] = this.fast_attacks[a];
        }

        return liste;
    }

    constructor(id, name, type, power, duration) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    toString() {
        return this.name + " : #" + this.id + ", " + this.type.name + ", " + this.power + ", " + this.duration + "ms";
    }
}