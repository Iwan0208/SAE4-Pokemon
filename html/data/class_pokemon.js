class Pokemon {
    static all_pokemons = [];


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
        console.log(this.pokemon_name + " : #" + this.pokemon_id + ", [" + this.pokemon_types.map(type => type.name).join(", ") + "], " +
            "[STA: " + this.base_stamina + ", ATK: " + this.base_attack + ", DEF: " + this.base_defense + "], " + 
            "Rapides = [" + this.charged_moves.map(move => move.name).join(", ") + "], " +
            "Chargées = [" + this.fast_moves.map(move => move.name).join(", ") + "]");
    }

    getTypes() {
        return this.pokemon_types;
    }

    getMoves() {
        return this.charged_moves.concat(this.fast_moves);
    }
}