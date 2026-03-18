
Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

function getPokemonsByAttack(attackName) {
    let listePokemons = [];

    for (let p_id in Pokemon.all_pokemons) {
        let pokemonCourant = Pokemon.all_pokemons[p_id];

        if (pokemonCourant.fast_moves.some(
                attack => attack.name.toUpperCase() == attackName.toUpperCase()
            ) || pokemonCourant.charged_moves.some(
                attack => attack.name.toUpperCase() == attackName.toUpperCase()
            )) {

            listePokemons.push(pokemonCourant);
        }
    }

    return listePokemons;
}
