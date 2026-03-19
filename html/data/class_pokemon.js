class Pokemon {
    static all_pokemons = {};

    static fill_pokemons() {
        for (let pokemon of pokemons) {
            if (pokemon.form != "Normal") continue;

            let types = pokemon_types.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].type;
            types = types.map(type => Type.all_types[type]);

            let charged_moves = pokemon_moves.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].charged_moves;
            charged_moves = charged_moves.map(attack => Attack.get_attack_by_name(attack));

            let fast_moves = pokemon_moves.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].fast_moves;
            fast_moves = fast_moves.map(attack => Attack.get_attack_by_name(attack));

            this.all_pokemons[pokemon.pokemon_id] = new this(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.base_stamina, pokemon.base_attack, pokemon.base_defense, types, fast_moves, charged_moves);
        }
    }

    static getWeakestEnnemies(attackName) {
        let attack = Attack.get_attack_by_name(attackName);

        if (attack == undefined) return;

        let liste = {};

        for (let p_id in this.all_pokemons) {
            let pokemon = this.all_pokemons[p_id];

            let efficacite = 1;
            for (let i of pokemon.pokemon_types) {
                efficacite *= attack.type.effectiveness[i.name];
            }

            if (liste.hasOwnProperty(efficacite)) {
                liste[efficacite].push(pokemon);
            } else {
                liste[efficacite] = [pokemon];
            }
        }

        let maxValue = Math.max(...Object.keys(liste));
        display(liste[maxValue], "Pokémons sur lesquels " + attack.name + " est la plus puissante");
    }

    constructor(pokemon_id, pokemon_name, base_stamina, base_attack, base_defense, pokemon_types, fast_moves, charged_moves) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.base_stamina = base_stamina;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.pokemon_types = pokemon_types;
        this.fast_moves = fast_moves;
        this.charged_moves = charged_moves;
    }

    static get_pokemon_by_name(pokemon_name) {
        for (let pokemon_id in this.all_pokemons) {
            if (pokemon_name.toUpperCase() == this.all_pokemons[pokemon_name].name.toUpperCase()) {
                return this.all_pokemons[pokemon_id];
            }
        }
    }

    toString() {
        return this.pokemon_name + " : #" + this.pokemon_id + ", [" + this.pokemon_types.map(type => type.name).join(", ") + "], " +
            "[STA: " + this.base_stamina + ", ATK: " + this.base_attack + ", DEF: " + this.base_defense + "], " + 
            "Rapides = [" + this.charged_moves.map(move => move.name).join(", ") + "], " +
            "Chargées = [" + this.fast_moves.map(move => move.name).join(", ") + "]";
    }

    getTypes() {
        return this.pokemon_types;
    }

    getMoves() {
        return this.charged_moves.concat(this.fast_moves);
    }

    

    getBestFastAttacksForEnemy(print, pokemonName) {
        let p = this.get_pokemon_by_name(pokemonName);
        list = [];

        let damage = power * effectiveness * (this.base_attack / pokemonName.base_attack);

        let list = this.fast_moves
            .sort((a, b) => {
                let damageA = a.power * a.type.effectiveness[p.pokemon_types.name] * (this.base_attack / p.base_attack);
                let damageB = b.power * b.type.effectiveness[p.type.name] * (this.base_attack / p.base_attack);
                if () {

                }
            })

        let bestAttack = 
            .reduce();
        
        if (print) {
            console.log(`Liste des ${list.length} ${name} :`);

            list.forEach(elt => {
                console.log(`- ${elt.toString()}`);
            });
        }

        return 0;
    }
}