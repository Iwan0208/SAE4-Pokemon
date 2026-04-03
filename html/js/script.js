Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

console.log(Pokemon.all_pokemons);

const tbody = document.getElementsByTagName("tbody")[0];

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageSpan = document.getElementById("page");

const PAGE_LIMIT = 25;
let currentPage = 1;

// Remplissage du tableau des Pokémons
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

const PAGE_COUNT = Math.ceil((tbody.rows.length - 1) / PAGE_LIMIT);

function prevPage() {
    currentPage--;
    updateTable(currentPage);
}

function nextPage() {
    currentPage++;
    updateTable(currentPage);
}

function updateTable(page) {
    // S'assurer que le numéro de page est valide
    if (page < 1) page = 1;
    if (page > PAGE_COUNT) page = PAGE_COUNT;

    // Actualiser le numéro de page
    pageSpan.textContent = `Page ${page} sur ${PAGE_COUNT}`;

    // Désactiver les boutons si nécessaire
    prev.disabled = page == 1;
    next.disabled = page == PAGE_COUNT;

    // Cacher toutes les lignes
    [...tbody.rows].forEach((tr) => {
        tr.style.display = 'none';
    });

    // N'afficher que les bonnes lignes
    for (let i = (page - 1) * PAGE_LIMIT; i < page * PAGE_LIMIT; i++) {
        if (tbody.rows[i]) {
            tbody.rows[i].style.display = ""
        }
    }
}

window.onload = function() {
    updateTable(currentPage); 
}