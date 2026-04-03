let tbody = document.getElementsByTagName("tbody")[0];

Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

for (let p_id in Pokemon.all_pokemons) {
    let p = Pokemon.all_pokemons[p_id];

    let ligne = document.createElement('tr');

    let col = document.createElement("td");
    col.textContent = p.pokemon_id;
    col.classList.add("number");
    ligne.appendChild(col);

    col = document.createElement("td");
    col.textContent = p.pokemon_name;
    ligne.appendChild(col);

    col = document.createElement("td");
    col.textContent = p.pokemon_types.map((t) => t.name).join(", ");
    ligne.appendChild(col);

    col = document.createElement("td");
    col.textContent = p.base_stamina;
    col.classList.add("number");
    ligne.appendChild(col);

    col = document.createElement("td");
    col.textContent = p.base_attack;
    col.classList.add("number");
    ligne.appendChild(col);

    col = document.createElement("td");
    col.textContent = p.base_defense;
    col.classList.add("number");
    ligne.appendChild(col);

    col = document.createElement("td");

    let fileName = "webp/images/" + p.pokemon_id.toString().padStart(3, "0") + ".webp";

    let img = document.createElement("img");
    img.setAttribute("src", fileName);
    img.setAttribute("onerror", "this.src='webp/image-none.webp'");
    
    col.appendChild(img);
    col.classList.add("sprite");
    ligne.appendChild(col);

    ligne.setAttribute("id", p.pokemon_id);

    ligne.addEventListener("click", (event) => {
        let ligne = event.currentTarget;
        
        let pokemonId = ligne.getAttribute("id");
        let pokemon = Pokemon.all_pokemons[pokemonId];

        let fenetre = document.createElement("div");
        fenetre.setAttribute("id", "details");

        let boutonFermer = document.createElement("button");
        boutonFermer.setAttribute("onclick", "fermerDetails()");
        boutonFermer.textContent = "X";
        fenetre.appendChild(boutonFermer);

        let titre = document.createElement("h1");
        titre.textContent = "Liste des attaques rapides";
        fenetre.appendChild(titre);

        let list = document.createElement("ul");

        for (let attack of pokemon.fast_moves) {
            let elt = document.createElement("li");
            elt.textContent = attack.name;
            list.appendChild(elt);
        }

        fenetre.appendChild(list);
        

        titre = document.createElement("h1");
        titre.textContent = "Liste des attaques rapides";
        fenetre.appendChild(titre);

        list = document.createElement("ul");

        for (let attack of pokemon.charged_moves) {
            let elt = document.createElement("li");
            elt.textContent = attack.name;
            list.appendChild(elt);
        }

        fenetre.appendChild(list);
        document.getElementById("details").replaceWith(fenetre);

    });
    
    tbody.appendChild(ligne);
}

function fermerDetails() {
    document.getElementById("details").style.display = "none";
}