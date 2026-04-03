Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

const tbody = document.getElementsByTagName("tbody")[0];

// Variables pour la pagination
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageSpan = document.getElementById("page");

const PAGE_LIMIT = 25;
const PAGE_COUNT = Math.ceil((Object.keys(Pokemon.all_pokemons).length - 1) / PAGE_LIMIT);
let currentPage = 1;

// Variables pour le filtrage
const type = document.getElementById("type");
const fastAttack = document.getElementById("fast_attack");
const nom = document.getElementById("nom");

// REMPLISSAGE DU TABLEAU

for (let p_id in Pokemon.all_pokemons) {
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

function hideRows() {
    [...tbody.rows].forEach((tr) => {
        tr.style.display = 'none';
    });
}


// PAGINATION

function prevPage() {
    currentPage--;
    updatePage(currentPage);
}

function nextPage() {
    currentPage++;
    updatePage(currentPage);
}

function updatePage(page) {
    // S'assurer que le numéro de page est valide
    if (page < 1) page = 1;
    if (page > PAGE_COUNT) page = PAGE_COUNT;

    // Actualiser le numéro de page
    pageSpan.textContent = `Page ${page} sur ${PAGE_COUNT}`;

    // Désactiver les boutons si nécessaire
    prev.disabled = page == 1;
    next.disabled = page == PAGE_COUNT;

    // Cacher toutes les lignes
    hideRows();

    // N'afficher que les bonnes lignes
    for (let i = (page - 1) * PAGE_LIMIT; i < page * PAGE_LIMIT; i++) {
        if (tbody.rows[i]) {
            tbody.rows[i].style.display = ""
        }
    }
}

// Commencer à la première page
window.onload = function() {
    updatePage(currentPage); 
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



function filterByType(typeName) {
    let pokemons = Pokemon.getPokemonsByType(typeName);

    hideRows();

}

function filterByName(name) {
    console.log(name.toUpperCase());
}

function filterByFastAttack(fastAttack) {
    console.log(Attack.fast_attacks[fastAttack]);
}

type.addEventListener("change", (e) => {
    filterByType(e.target.value);
});

fastAttack.addEventListener("change", (e) => {
    filterByFastAttack(e.target.value);
});

nom.addEventListener("input", (e) => {
    filterByName(e.target.value);
});
