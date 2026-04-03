let tbody = document.getElementsByTagName("tbody")[0];

Type.fill_types();
Attack.fill_attacks();
Pokemon.fill_pokemons();

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

    let fileName = "webp/sprites/" + p.pokemon_id.toString().padStart(3, "0") + "MS.webp";

    let img = document.createElement("img");
    img.setAttribute("src", fileName);
    img.setAttribute("onerror", "this.src='webp/sprite-none.webp'");
    
    col.appendChild(img);
    ligne.appendChild(col);

    tbody.appendChild(ligne);
}