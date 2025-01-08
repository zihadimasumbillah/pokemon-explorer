import bug from "../assets/pokemon/types/bug.png";
import dark from "../assets/pokemon/types/dark.png";
import dragon from "../assets/pokemon/types/dragon.png";
import electric from "../assets/pokemon/types/electric.png";
import fairy from "../assets/pokemon/types/fairy.png";
import fighting from "../assets/pokemon/types/fighting.png";
import fire from "../assets/pokemon/types/fire.png";
import flying from "../assets/pokemon/types/flying.png";
import ghost from "../assets/pokemon/types/ghost.png";
import grass from "../assets/pokemon/types/grass.png";
import ground from "../assets/pokemon/types/ground.png";
import ice from "../assets/pokemon/types/ice.png";
import normal from "../assets/pokemon/types/normal.png";
import poison from "../assets/pokemon/types/poison.png";
import psychic from "../assets/pokemon/types/psychic.png";
import rock from "../assets/pokemon/types/rock.png";
import steel from "../assets/pokemon/types/steel.png";
import water from "../assets/pokemon/types/water.png";

const icons = {
    bug: bug,
    dark: dark,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    fighting: fighting,
    fire: fire,
    flying: flying,
    ghost: ghost,
    grass: grass,
    ground: ground,
    ice: ice,
    normal: normal,
    poison: poison,
    psychic: psychic,
    rock: rock,
    steel: steel,
    water: water,
};

export function searchIcon(search) {
    if (search) {
        search = Object.entries(icons).filter((icon) => icon[0] === search);
        return search[0][1];
    }
}
