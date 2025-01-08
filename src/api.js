import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 100) => {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}`);
    const pokemonList = await Promise.all(
        response.data.results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.name);
            return {
                ...pokemon,
                id: details.id,
                order: details.order,
                types: details.types,
                sprites: details.sprites,
            };
        })
    );
    return pokemonList;
};

export const fetchPokemonDetails = async (nameOrId) => {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
};

export async function searchPokemon(pokemon) {
    try {
        const url = `${API_BASE_URL}/pokemon/${pokemon}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("searchPokemon: " + error);
    }
}

export async function getAllPokemons(offset) {
    try {
        const url = `${API_BASE_URL}/pokemon?limit=50&offset=${offset}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("getAllPokemons: " + error);
    }
}

export async function getPokemonData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("getPokemonData: " + error);
    }
}

export async function getPokemonDetails(id) {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/pokemon-species/${id}`
        );
        return response.data;
    } catch (error) {
        console.log("getPokemonDetails: " + error);
    }
}
