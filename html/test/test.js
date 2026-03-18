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
            t.name.toUpperCase() == typeName.toUpperCase();
        })
    });

    display(list);
}

getPokemonsByType("Bug");


function getAttacksByType(typeName) {
    let list = Attack.all_attacks.filter(a => {
        a.type.name = typeName
    });

    display(list);
}

getAttacksByType("Fire");


function typeCompare(a, b) {
    // Les Pokémons n'ayant qu'un type sont placés avant ceux ayant 2 types
    if (a.pokemon_types.length < b.pokemon_types.length) {
        return -1;
    } else if (a.pokemon_types.length > b.pokemon_types.length) {
        return 1;
    }

    let i = 0;

    while (i < a.pokemon_types.length) {
        if (a.pokemon_types[i].localeCompare(b.pokemon_types[i]) < 0) {
            return -1;
        } else if (a.pokemon_types[i].localeCompare(b.pokemon_types[i]) > 0) {
            return 1;
        }

        i++;
    }

    return 0;
}

function sortPokemonByTypeThenName() {
    let list = Pokemon.all_pokemons.sort((a, b) => {
        a.pokemon_name.localeCompare(b.pokemon_name) ||
        typeCompare(a, b)
    });

    display(list);
}