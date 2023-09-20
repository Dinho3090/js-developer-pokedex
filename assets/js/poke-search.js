document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchType = document.getElementById("searchType");
    const resultsDiv = document.getElementById("results");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const searchBy = searchType.value;

        resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

        if (searchBy === "name") {
            // Buscar por nome
            fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Não foi possível encontrar o Pokémon.");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Exibe os resultados na página
                    const pokemonName = data.name;
                    const pokemonTypes = data.types.map((type) => type.type.name).join("");
                    const pokemonImage = data.sprites.other.home.front_default;

                    const pokemonInfo = `
                        <div class="type ${pokemonTypes}">
                            <h2>${pokemonName}</h2>
                            <p><strong>Tipo:</strong> ${pokemonTypes}</p>
                            <img src="${pokemonImage}" alt="${pokemonName}">
                        </div>`;

                    resultsDiv.innerHTML = pokemonInfo;
                })
                .catch((error) => {
                    resultsDiv.innerHTML = `<p>${error.message}</p>`;
                });
        } else if (searchBy === "type") {
            // Buscar por tipo
            fetch(`https://pokeapi.co/api/v2/type/${searchTerm}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Não foi possível encontrar o tipo de Pokémon.");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Exibe os resultados na página
                    const pokemons = data.pokemon.map((entry) => entry.pokemon);

                    if (pokemons.length === 0) {
                        resultsDiv.innerHTML = `<p>Nenhum Pokémon encontrado com o tipo "${searchTerm}".</p>`;
                        return;
                    }

                    const pokemonList = pokemons.map((pokemon) => `
                        <div class="pokemon">
                            <span class="name">${pokemon.name}</span>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.url.split("/")[6]}.png" alt="${pokemon.name}" />                        </div>
                    `).join("");

                    resultsDiv.innerHTML = `<h2>Pokémons com o tipo "${searchTerm}":</h2>${pokemonList}`;
                })
                .catch((error) => {
                    resultsDiv.innerHTML = `<p>${error.message}</p>`;
                });
        }
    });
});
