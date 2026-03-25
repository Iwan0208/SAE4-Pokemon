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


function fastFight(pokemonNameA, pokemonNameB) {
    let pokemonA = Pokemon.getPokemonByName(pokemonNameA);
    
    if (pokemonA == undefined) {
        console.log("Aucun Pokémon du nom de '" + pokemonNameA + "' trouvé");
        return;
    }
    
    pokemonA = pokemonA.copy();
    pokemonA.reste = pokemonA.base_stamina;


    let pokemonB = Pokemon.getPokemonByName(pokemonNameB);
    
    if (pokemonB == undefined) {
        console.log("Aucun Pokémon du nom de '" + pokemonNameB + "' trouvé");
        return;
    }
    
    pokemonB = pokemonB.copy();
    pokemonB.reste = pokemonB.base_stamina;

    // let deroulement = [["Tour", "Attaquant", "ATK", "Defenseur", "DEF", "Nom attaque", "Efficacité", "Dégâts", "PV restants"]];
    let deroulement = {};

    let attaquant = pokemonA;
    let defenseur = pokemonB;

    let nbTour = 1;
    while (pokemonA.reste > 0 && pokemonB.reste > 0) {
        let attack = attaquant.getBestFastAttacksForEnemy(false, defenseur.pokemon_name);
        defenseur.reste = Math.max(defenseur.reste - attack.pts, 0);

        let tour = {
            "Tour":         nbTour,
            "Attaquant":    attaquant.pokemon_name,
            "ATK":          attaquant.base_attack,
            "Defenseur":    defenseur.pokemon_name,
            "DEF":          defenseur.base_defense,
            "Nom attaque":  attack.atk.name,
            "Efficacité":   attack.eff,
            "Dégâts":       attack.pts,
            "PV restants":  defenseur.reste
        };
        
        deroulement[nbTour] = tour;

        nbTour++;

        let temp = attaquant;
        attaquant = defenseur;
        defenseur = temp;
    }

    console.table(deroulement);
}
