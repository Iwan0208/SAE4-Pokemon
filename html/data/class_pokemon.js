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
            if (pokemon_name.toUpperCase() == this.all_pokemons[pokemon_id].pokemon_name.toUpperCase()) {
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
        let p = Pokemon.get_pokemon_by_name(pokemonName);

        let attack_stats = {};

        let list = this.fast_moves.sort((a, b) => {
            // Calcul des efficacités et dégâts
            let efficaciteA = 1;
            let efficaciteB = 1;

            p.pokemon_types.forEach((t) => {
                efficaciteA *= a.type.effectiveness[t.name];
                efficaciteB *= b.type.effectiveness[t.name];
            });

            let ptsA = a.power * efficaciteA * (this.base_attack / p.base_attack);
            let ptsB = b.power * efficaciteB * (this.base_attack / p.base_attack);
            
            // Enregistrer les statistiques des attaques
            attack_stats[a.id] = {};
            attack_stats[a.id].pts = ptsA;
            attack_stats[a.id].eff = efficaciteA;

            attack_stats[b.id] = {};
            attack_stats[b.id].pts = ptsB;
            attack_stats[b.id].eff = efficaciteB;

            // Tri décroissant
            if (ptsA > ptsB) {
                return -1;
            } else if (ptsA < ptsB) {
                return 1;
            }
            return 0;
        });

        let bestAttack = list.reduce((a, b) => attack_stats[a.id].pts > attack_stats[b.id].pts ? a : b);
        
        if (print) {
            console.log(`Liste des ${list.length} Attaques :`);

            list.forEach(elt => {
                console.log(`- ${elt.toString()}`);
                console.log(`Dégâts : ${attack_stats[elt.id]}`);
            });
        }

        return {atk: bestAttack, pts: attack_stats[bestAttack.id].pts, eff: attack_stats[bestAttack.id].eff};
    }
}