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

    display(listePokemons);
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
    typeA = a.pokemon_types.sort().join("").toUpperCase();
    typeB = b.pokemon_types.sort().join("").toUpperCase();

    return typeA.localeCompare(typeB);
}

function sortPokemonByTypeThenName() {
    let pokemonList = Pokemon.all_pokemons;

    const list = Object.entries(pokemonList)
        .sort(([,a],[,b]) => compareType(a, b) || a.pokemon_name.localeCompare(b.pokemon_name))
        .map(e => e[1]);

    display(list, "Pokémons");
}

//sortPokemonByTypeThenName();

function testGetBestFastAttacksForEnemy() {
    let pokemon = Pokemon.all_pokemons[151];
    let enemy = Pokemon.all_pokemons[1];

    console.log(pokemon.getBestFastAttacksForEnemy(false, enemy.pokemon_name));
}

testGetBestFastAttacksForEnemy();