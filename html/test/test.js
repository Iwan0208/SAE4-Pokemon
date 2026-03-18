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


function compareType(a, b) {
    let i = 0;

    let typeA = a.pokemon_types.join("").toUpperCase();
    let typeB = b.pokemon_types.join("").toUpperCase();

    return typeA.localeCompare(typeB);
}

function sortPokemonByTypeThenName() {
    let pokemonList = Pokemon.all_pokemons;

    const list = Object.entries(pokemonList)
        .sort(([,a],[,b]) => compareType(a, b) || a.pokemon_name.localeCompare(b.pokemon_name))
        .map(e => e[1]);

    display(list, "Pokémons");
}

sortPokemonByTypeThenName();
