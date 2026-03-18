Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

function display(list, name) {
    console.log(`Liste des ${list.length} ${name} :`);

    list.forEach(elt => {
        console.log(`- ${elt.toString()}`);
    });
}


function getPokemonsByType(typeName) {
    list = [];

    for (id in Pokemon.all_pokemons) {
        let p = Pokemon.all_pokemons[id];
        
        
        if (p.pokemon_types.some(t => {
            return t.name.toUpperCase() == typeName.toUpperCase()
        })) {
            list.push(p);
        }
    }

    display(list, "Pokémons");
}

//getPokemonsByType("Bug");


function getAttacksByType(typeName) {
    list = [];

    for (id in Attack.all_attacks) {
        let a = Attack.all_attacks[id];
        
        if (a.type.name.toUpperCase() == typeName.toUpperCase()) {
            list.push(a);
        }
    }

    display(list, "attaques");
}

//getAttacksByType("Fire");


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
    let pokemonList = Pokemon.all_pokemons;

    const list = Object.entries(pokemonList)
        .sort(([,a],[,b]) => a.pokemon_name.localeCompare(b.pokemon_name) || typeCompare(a, b))
        .map(e => e[1]);

    display(list, "Pokémons");
}

sortPokemonByTypeThenName();
