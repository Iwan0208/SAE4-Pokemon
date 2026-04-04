class Pokemon {
    static all_pokemons = {};

    static fill_pokemons() {
        for (let pokemon of pokemons) {
            if (pokemon.form != "Normal") continue;

            let types = pokemon_types.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].type;
            types = types.map(type => Type.all_types[type]);

            let charged_moves = pokemon_moves.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].charged_moves;
            charged_moves = charged_moves.map(attack => Attack.getAttackByName(attack));

            let fast_moves = pokemon_moves.filter(objet => objet.pokemon_id == pokemon.pokemon_id && objet.form == "Normal")[0].fast_moves;
            fast_moves = fast_moves.map(attack => Attack.getAttackByName(attack));

            this.all_pokemons[pokemon.pokemon_id] = new this(pokemon.pokemon_id, pokemon.pokemon_name, pokemon.base_stamina, pokemon.base_attack, pokemon.base_defense, types, fast_moves, charged_moves);
        }
    }

    static getWeakestEnnemies(attackName) {
        let attack = Attack.getAttackByName(attackName);

        if (attack == undefined) return;

        let liste = {};

        for (let p_id in this.all_pokemons) {
            let pokemon = this.all_pokemons[p_id];

            let effectiveness = pokemon.getEffectiveness(attackName);

            if (liste.hasOwnProperty(effectiveness)) {
                liste[effectiveness].push(pokemon);
            } else {
                liste[effectiveness] = [pokemon];
            }
        }

        let maxValue = Math.max(...Object.keys(liste));
        display(liste[maxValue], "Pokémons sur lesquels " + attack.name + " est la plus puissante");
    }

    // Renvoie un seul Pokémon si son nom correspond, sinon undefined
    static getPokemonByName(pokemon_name) {
        for (let pokemon_id in this.all_pokemons) {
            if (pokemon_name.toUpperCase() == this.all_pokemons[pokemon_id].pokemon_name.toUpperCase()) {
                return this.all_pokemons[pokemon_id];
            }
        }

        return undefined;
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


    toString() {
        return this.pokemon_name + " : #" + this.pokemon_id + ", [" + this.pokemon_types.map(type => type.name).join(", ") + "], " +
            "[STA: " + this.base_stamina + ", ATK: " + this.base_attack + ", DEF: " + this.base_defense + "], " + 
            "Rapides = [" + this.fast_moves.map(move => move.name).join(", ") + "], " +
            "Chargées = [" + this.charged_moves.map(move => move.name).join(", ") + "]";
    }

    getTypes() {
        return this.pokemon_types;
    }

    // Toutes les attaques chargées et rapides
    getMoves() {
        return this.charged_moves.concat(this.fast_moves);
    }

    // Retourne l'efficacité d'une attaque sur soi-même
    getEffectiveness(attackName) {
        let effectiveness = 1;

        let a = Attack.getAttackByName(attackName);
        if (a == undefined) return;

        this.pokemon_types.forEach((t) => {
            effectiveness *= a.type.effectiveness[t.name];
        }); 

        return effectiveness;
    }

    // Retourne le nombre de points de dégâts d'une attaque vers un autre Pokémon
    getPoints(attackName, pokemonName) {
        let a = Attack.getAttackByName(attackName);
        if (a == undefined) return;

        let p = Pokemon.getPokemonByName(pokemonName);
        if (p == undefined) return;

        return Math.ceil(a.power * this.getEffectiveness(a.name) * (this.base_attack / p.base_defense));
    }

    getBestFastAttacksForEnemy(print, pokemonName) {
        let p = Pokemon.getPokemonByName(pokemonName);

        if (p == undefined) return;
        if (p.fast_moves == []) return;

        // Créer et initialiser un objet contenant l'efficacité et les points de dégâts des attaques
        let first_attack = this.fast_moves[0];
        let attacks = [this.fast_moves[0]];

        let attack_stats = {};
        attack_stats[first_attack.id] = {};
        attack_stats[first_attack.id].pts = this.getPoints(first_attack.name, p.pokemon_name);
        attack_stats[first_attack.id].eff = p.getEffectiveness(first_attack.name);

        // On récupère l'attaque faisant le plus de dégâts à cet adversaire
        attacks = this.fast_moves.sort((a, b) => {
            // Calcul des points de dégâts infligés par les attaques
            let ptsA = this.getPoints(a.name, p.pokemon_name);
            let ptsB = this.getPoints(b.name, p.pokemon_name);
            
            // Enregistrer les informations sur chaque attaque pour les afficher plus tard
            attack_stats[a.id] = {};
            attack_stats[a.id].pts = ptsA;
            attack_stats[a.id].eff = p.getEffectiveness(a.name);

            attack_stats[b.id] = {};
            attack_stats[b.id].pts = ptsB;
            attack_stats[b.id].eff = p.getEffectiveness(b.name);

            // Retourne l'attaque la plus puissante (si égalité, la première par ordre alphabétique croissant)
            if (ptsA > ptsB) {
                return -1;
            } else if (ptsA < ptsB) {
                return 1;
            } else {
                return a.name < b.name ? -1 : 1;
            }
        });

        // Après avoir trouvé la meilleure attaque, on recalcule ses points de dégâts
        let best_attack = attacks[0];
        
        // Affichage
        if (print) {
            console.log(`Liste des ${attacks.length} Attaques :`);

            attacks.forEach(elt => {
                console.log(`- ${elt.toString()}`);
                console.log(`Dégâts : ${attack_stats[elt.id].pts}`);
            });
        }
        
        return {atk: best_attack, pts: attack_stats[best_attack.id].pts, eff: attack_stats[best_attack.id].eff};
    }

    copy() {
        return new Pokemon(this.pokemon_id, this.pokemon_name, this.base_stamina, this.base_attack, this.base_defense, this.pokemon_types, this.fast_moves, this.charged_moves);
    }
    
}