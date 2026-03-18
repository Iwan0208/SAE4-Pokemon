Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

function display(pokemonList) {
    console.log(`Liste des ${pokemonList.length} Pokémons :`);

    pokemonList.forEach(pokemon => {
        console.log(`- ${pokemon.toString()}`);
    });

}

function getPokemonsByType(typeName) {
    let list = Pokemon.all_pokemons.filter(p => {
        p.pokemon_types.some(t => {
            t.name == typeName
        })
    });

    display(list);
}

getPokemonsByType("Bug");


function getAttacksByType(typeName) {
    let list = Pokemon.all_attacks.filter(a => {
        a.type.
    });

    display(list);
}

getPokemonsByAttack()