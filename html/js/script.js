Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

const tbody = document.getElementsByTagName("tbody")[0];
let infosOpen = false;

// Variables pour la pagination
const prevs = Array.from(document.getElementsByClassName("prev"));
const nexts = Array.from(document.getElementsByClassName("next"));
const pageSpans = Array.from(document.getElementsByClassName("page"));

const PAGE_LIMIT = 25;

let currentPage = 1;
let pageCount = Math.ceil((Object.keys(Pokemon.all_pokemons).length - 1) / PAGE_LIMIT);

let filters = {
    name: "",
    type: "",
    attack: ""
};

let sort = {
    field: "",
    order: 0
}

// Variables pour le filtrage
const type = document.getElementById("type");
const fastAttack = document.getElementById("fast_attack");
const nom = document.getElementById("nom");

// Variables pour le tri
const sortFields = document.querySelectorAll("th[data-field]");

// REMPLISSAGE DU TABLEAU

function fermerDetails(partie) {
    document.getElementById(partie).style.display = "none";
}

function fillTable(pokemonList) {
    // Vider le tableau
    tbody.innerHTML = "";

    // Remplir le tableau
    pokemonList.forEach(p => { 
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
        img.classList.add("sprite");
        
        col.appendChild(img);

        img.addEventListener("mouseover", (event) => {
            if (infosOpen) return;

            let img = event.currentTarget;
            
            let fenetre = document.createElement("div");
            fenetre.setAttribute("id", "image-zoom");
            
            let fileName = img.getAttribute("src");
        
            let imgBalise = document.createElement("img");
            imgBalise.setAttribute("src", fileName);
            imgBalise.setAttribute("onerror", "this.src='webp/image-none.webp'");

            fenetre.appendChild(imgBalise);
            
            document.getElementById("image-zoom").replaceWith(fenetre);

        })


        img.addEventListener("mouseleave", (event) => {
            fermerDetails("image-zoom");
        })

        ligne.appendChild(col);

        ligne.setAttribute("id", p.pokemon_id);

        // Affichage des détails sur clic de l'utilisateur
        ligne.addEventListener("click", (event) => {
            let ligne = event.currentTarget;
            
            let pokemonId = ligne.getAttribute("id");
            let pokemon = Pokemon.all_pokemons[pokemonId];

            let fenetre = document.createElement("div");
            fenetre.setAttribute("id", "infos");

            let boutonFermer = document.createElement("button");
            boutonFermer.setAttribute("onclick", "fermerDetails('infos'); infosOpen = false;");
            boutonFermer.innerHTML = "&times";
            fenetre.appendChild(boutonFermer);

            let partieHaute = document.createElement('div');

            let nomPokemon = document.createElement("h2");
            nomPokemon.textContent = p.pokemon_name;
            partieHaute.appendChild(nomPokemon);

            let spritePokemon = document.createElement('img');
            spritePokemon.src = ligne.lastElementChild.children[0].src;
            spritePokemon.classList.add("sprite");
            
            partieHaute.appendChild(spritePokemon);
            fenetre.appendChild(partieHaute);

            let titre = document.createElement("h3");
            titre.textContent = "Liste des attaques rapides";
            fenetre.appendChild(titre);

            let list = document.createElement("ul");

            for (let attack of pokemon.fast_moves) {
                let elt = document.createElement("li");
                elt.textContent = attack.name;
                list.appendChild(elt);
            }

            fenetre.appendChild(list);
            

            titre = document.createElement("h3");
            titre.textContent = "Liste des attaques chargées";
            fenetre.appendChild(titre);

            list = document.createElement("ul");

            for (let attack of pokemon.charged_moves) {
                let elt = document.createElement("li");
                elt.textContent = attack.name;
                list.appendChild(elt);
            }

            fenetre.appendChild(list);
            document.getElementById("infos").replaceWith(fenetre);
            
            infosOpen = true;
        });

        tbody.appendChild(ligne);
    });
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
    pageSpans.forEach(p => { p.textContent = `Page ${currentPage} sur ${pageCount}`});

    // Désactiver les boutons si nécessaire
    prevs.forEach(p => { p.disabled = currentPage == 1 });
    nexts.forEach(n => { n.disabled = currentPage == pageCount });

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
    let pokemons = Pokemon.all_pokemons;
    let pokemonList = Object.values(Pokemon.all_pokemons);
    
    pokemonList = applyFilters(pokemonList);
    pokemonList = applySort(pokemonList);
    
    // Calculer le nombre de pages à afficher
    pageCount = Math.ceil(pokemonList.length / PAGE_LIMIT);

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

function applyFilters(pokemonList) {
    return pokemonList
        // Filtre par type
        .filter(p => {
            if (filters.type == "") return true;
            
            return p.pokemon_types.some(t =>
                t.name.toUpperCase() == filters.type.toUpperCase()
            )
        })

        // Filtre par attaque
        .filter(p => {
            if (filters.attack == "") return true;

            return p.fast_moves.some(a =>
                a.name.toUpperCase() == Attack.all_attacks[filters.attack].name.toUpperCase()
            )
        })

        // Filtre par nom
        .filter(p => {
            if (filters.name.trim() == "") return true;

            // Ignorer la casse et les accents
            let input = filters.name.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            
            return p.pokemon_name.toUpperCase().includes(input);
        });
}

function applySort(pokemonList) {
    if (sort.order == 0) return pokemonList;

    let sortedList = pokemonList;

    switch (sort.field) {
        case "id":
            sortedList = sortedList.sort((a, b) =>
                sort.order * (a.pokemon_id - b.pokemon_id) || a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
        
        case "name":
            sortedList = sortedList.sort((a, b) =>
                sort.order * a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
        
        case "type":
            sortedList = sortedList.sort((a, b) =>
                sort.order * a.pokemon_types.join("").localeCompare(b.pokemon_types.join("")) || a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
        
        case "stamina":
            sortedList = sortedList.sort((a, b) =>
                sort.order * (a.base_stamina - b.base_stamina) || a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
        
        case "attack":
            sortedList = sortedList.sort((a, b) =>
                sort.order * (a.base_attack - b.base_attack) || a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
        
        case "defense":
            sortedList = sortedList.sort((a, b) =>
                sort.order * (a.base_defense - b.base_defense) || a.pokemon_name.localeCompare(b.pokemon_name)
            )
            break;
    }

    return sortedList;
}

// Boutons de filtre

type.addEventListener("change", (e) => {
    filters.type = e.target.value;
    
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

// Boutons de tri

Array.from(sortFields).forEach(f => {
    f.addEventListener("click", (e) => {

        Array.from(sortFields).forEach(f => {
            f.classList.remove("sorted");
        });

        // Si on retrie sur le même champ, changer l'ordre (aucun -> croissant -> décroissant)
        if (sort.order == 0) {
            sort.order = 1;
            f.classList.add("sorted");
        } else if (sort.order == 1) {
            sort.order = -1;
            f.classList.add("sorted");
        } else if (sort.order == -1) {
            sort.order = 0;
            f.classList.remove("sorted");
        }

        // Si on trie sur un nouveau champ, trier dans l'ordre croissant par défaut
        if (sort.field != e.target.dataset.field) {
            sort.order = 1;
            f.classList.add("sorted");
        }

        sort.field = e.target.dataset.field;
        updateTable();
    });
})
