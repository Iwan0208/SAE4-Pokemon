Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

const tbody = document.getElementsByTagName("tbody")[0];

// Variables pour la pagination
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageSpan = document.getElementById("page");

const PAGE_LIMIT = 25;

let currentPage = 1;
let pageCount = Math.ceil((Object.keys(Pokemon.all_pokemons).length - 1) / PAGE_LIMIT);

let filters = {
    name: "",
    type: "",
    attack: -1
};

// Variables pour le filtrage
const type = document.getElementById("type");
const fastAttack = document.getElementById("fast_attack");
const nom = document.getElementById("nom");

// REMPLISSAGE DU TABLEAU

function fillTable(pokemonList = Pokemon.all_pokemons) {
    // Vider le tableau
    tbody.innerHTML = "";

    // Remplir le tableau
    for (let p_id in pokemonList) {
        let p = Pokemon.all_pokemons[p_id];

        let ligne = document.createElement('tr');

        let col = document.createElement("td");
        col.textContent = p.pokemon_id;
        ligne.appendChild(col);

        col = document.createElement("td");
        col.textContent = p.pokemon_name;
        ligne.appendChild(col);

        col = document.createElement("td");
        col.textContent = p.pokemon_types.map((t) => t.name).join(", ");
        ligne.appendChild(col);

        col = document.createElement("td");
        col.textContent = p.base_stamina;
        ligne.appendChild(col);

        col = document.createElement("td");
        col.textContent = p.base_attack;
        ligne.appendChild(col);

        col = document.createElement("td");
        col.textContent = p.base_defense;
        ligne.appendChild(col);

        col = document.createElement("td");

        let fileName = "webp/images/" + p.pokemon_id.toString().padStart(3, "0") + ".webp";

        let img = document.createElement("img");
        img.setAttribute("src", fileName);
        img.setAttribute("onerror", "this.src='webp/images/image-none.webp'");
        
        col.appendChild(img);
        ligne.appendChild(col);

        tbody.appendChild(ligne);
    }
}


function hideRows() {
    [...tbody.rows].forEach((tr) => {
        tr.style.display = 'none';
    });
}


// PAGINATION

function prevPage() {
    currentPage--;
    updatePage();
}

function nextPage() {
    currentPage++;
    updatePage();
}

function updatePage() {
    // S'assurer que le numéro de page est valide
    if (currentPage < 1) currentPage = 1;
    if (currentPage > pageCount) currentPage = pageCount;

    // Actualiser le numéro de page
    pageSpan.textContent = `Page ${currentPage} sur ${pageCount}`;

    // Désactiver les boutons si nécessaire
    prev.disabled = currentPage == 1;
    next.disabled = currentPage == pageCount;

    // Cacher toutes les lignes
    hideRows();

    // N'afficher que les bonnes lignes
    for (let i = (currentPage - 1) * PAGE_LIMIT; i < currentPage * PAGE_LIMIT; i++) {
        if (tbody.rows[i]) {
            tbody.rows[i].style.display = ""
        }
    }
}

function updateTable() {
    let pokemonList = Pokemon.all_pokemons;
    
    // Appliquer les filtres potentiels
    pokemonList = filterByType(pokemonList, filters.type);
    console.log("Filtre type :", pokemonList);
    pokemonList = filterByFastAttack(pokemonList, filters.attack);
    console.log("Filtre attaque :", pokemonList);
    pokemonList = filterByName(pokemonList, filters.name);
    console.log("Filtre nom :", pokemonList);
    
    // Calculer le nombre de pages à afficher
    pageCount = Math.ceil(Object.keys(pokemonList).length / PAGE_LIMIT);

    fillTable(pokemonList);
    updatePage();
}

// Initialiser le tableau
window.onload = function() {
    updateTable(); 
}


// FILTRAGE

// Options par défaut (pas de filtre)
let optType = document.createElement("option");
optType.value = "";
optType.textContent = "Sélectionnez un type";

type.appendChild(optType);

for (let type_name in Type.all_types) {
    let opt = document.createElement("option");
    opt.value = type_name;
    opt.textContent = type_name;
    
    type.appendChild(opt);
}


let optAttack = document.createElement("option");
optAttack.value = "";
optAttack.textContent = "Sélectionnez une attaque";

fastAttack.appendChild(optAttack);

// Remplissage dynamique des options
for (let a_id in Attack.fast_attacks) {
    let opt = document.createElement("option");
    opt.value = a_id;
    opt.textContent = Attack.fast_attacks[a_id].name;

    fastAttack.appendChild(opt);
}

function filterByType(pokemonList, typeName) {
    let type = Type.all_types[typeName];
    if (!type) return pokemonList;

    let pokemons = {};

    for (id in pokemonList) {
        let p = pokemonList[id];
        
        if (p.pokemon_types.some(t => {
            return t.name.toUpperCase() == typeName.toUpperCase()
        })) {
            pokemons[id] = p;
        }
    }

    return pokemons;
}

function filterByName(pokemonList, name) {
    if (name.trim() == "") return pokemonList;

    let pokemons = {};

    for (id in pokemonList) {
        let p = pokemonList[id];
        
        if (p.pokemon_name.toUpperCase().includes(name.trim().toUpperCase())) {
            pokemons[id] = p;
        }
    }

    return pokemons;
}

function filterByFastAttack(pokemonList, fastAttack) {
    let attack = Attack.fast_attacks[fastAttack];
    if (!attack) return pokemonList;

    let pokemons = {};

    for (id in pokemonList) {
        let p = pokemonList[id];
        
        if (p.fast_moves.some(a => {
            return a.name.toUpperCase() == attack.name.toUpperCase()
        })) {
            pokemons[id] = p;
        }
    }

    return pokemons;
}

type.addEventListener("change", (e) => {
    filters.type = e.target.value;
    currentPage = 1;
    updateTable();
});

fastAttack.addEventListener("change", (e) => {
    filters.attack = e.target.value;
    currentPage = 1;
    updateTable();
});

nom.addEventListener("input", (e) => {
    filters.name = e.target.value;
    currentPage = 1;
    updateTable();
});
