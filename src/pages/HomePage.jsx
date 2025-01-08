import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonList } from "../api";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const typeNames = [
    "All",
    "bug",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
];

export default function HomePage({ onFavoriteChange }) {
    const { type } = useParams();
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("name");
    const [typeFilter, setTypeFilter] = useState(type || "All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchPokemonList().then((data) => setPokemonList(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [typeFilter, sortOption, searchTerm]);

    useEffect(() => {
        if (type) {
            setTypeFilter(type);
        }
    }, [type]);

    const filteredPokemonList = useMemo(() => {
        return pokemonList
            .filter((pokemon) => {
                const typeMatches =
                    typeFilter === "All" || typeFilter === ""
                        ? true
                        : pokemon.types.some((t) => t.type.name === typeFilter);

                const searchMatches =
                    pokemon.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    pokemon.id.toString() === searchTerm;

                return typeMatches && searchMatches;
            })
            .sort((a, b) => {
                if (sortOption === "highest-to-lowest") {
                    const aStat = a.stats
                        ? a.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
                        : 0;
                    const bStat = b.stats
                        ? b.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
                        : 0;
                    return bStat - aStat;
                } else if (sortOption === "id") {
                    return a.id - b.id;
                } else if (sortOption === "name") {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });
    }, [pokemonList, typeFilter, searchTerm, sortOption]);

    const paginatedPokemonList = useMemo(() => {
        return isMobile
            ? filteredPokemonList
            : filteredPokemonList.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
              );
    }, [filteredPokemonList, currentPage, itemsPerPage, isMobile]);

    const handlePageChange = useCallback((event, value) => {
        setCurrentPage(value);
    }, []);

    return (
        <Container
            sx={{
                paddingLeft: isMobile ? 2 : 1,
                paddingRight: isMobile ? 2 : 1,
            }}
        >
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSortOption={setSortOption}
                sortOption={sortOption}
                setTypeFilter={setTypeFilter}
                typeFilter={typeFilter}
                typeNames={typeNames}
            />
            <PokemonList
                pokemonList={paginatedPokemonList}
                onFavoriteChange={onFavoriteChange}
            />
            {!isMobile && (
                <Pagination
                    count={Math.ceil(filteredPokemonList.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 2,
                        "& .MuiPaginationItem-root": {
                            transition: "transform 0.3s",
                            "&:hover": {
                                transform: "scale(1.1)",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                            },
                        },
                    }}
                />
            )}
        </Container>
    );
}

HomePage.propTypes = {
    onFavoriteChange: PropTypes.func.isRequired,
};
