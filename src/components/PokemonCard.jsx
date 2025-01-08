import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import { lighten } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchIcon } from "../utils/icons";
import { keyframes } from "@emotion/react";
import { memo } from "react";

const typeColors = {
    bug: "#A8B820",
    dark: "#705848",
    dragon: "#7038F8",
    electric: "#F8D030",
    fairy: "#EE99AC",
    fighting: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    ghost: "#705898",
    grass: "#78C850",
    ground: "#E0C068",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    steel: "#B8B8D0",
    water: "#6890F0",
};

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-15px);
    }
`;

const PokemonCard = ({
    pokemon,
    onFavoriteChange,
    isFavoritePage,
    removeFavorite,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        const isFav = storedFavorites.some((fav) => fav.name === pokemon.name);
        setIsFavorite(isFav);
    }, [pokemon.name]);

    const handleAddFavorite = useCallback(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = [...storedFavorites, pokemon];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(true);
        onFavoriteChange(updatedFavorites);
    }, [pokemon, onFavoriteChange]);

    const handleRemoveFavorite = useCallback(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = storedFavorites.filter(
            (fav) => fav.name !== pokemon.name
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(false);
        onFavoriteChange(updatedFavorites);
        if (removeFavorite) {
            removeFavorite(pokemon.name);
        }
    }, [pokemon.name, onFavoriteChange, removeFavorite]);

    const handleTypeClick = useCallback(
        (type) => {
            navigate(`/type/${type}`);
        },
        [navigate]
    );

    const mainType = pokemon.types[0].type.name;
    const backgroundColor = lighten(typeColors[mainType], 0.8);

    return (
        <Card
            sx={{
                maxWidth: 250,
                maxHeight: 250,
                margin: 2,
                boxShadow: 3,
                position: "relative",
                backgroundColor: backgroundColor,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                },
            }}
        >
            {isFavoritePage && (
                <IconButton
                    onClick={handleRemoveFavorite}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        color: "red",
                        backgroundColor: "white",
                        "&:hover": {
                            backgroundColor: "lightgray",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}
            <div
                style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: backgroundColor,
                    padding: 4,
                    borderRadius: "50%",
                    cursor: "pointer",
                }}
                onClick={() => handleTypeClick(mainType)}
            >
                <img
                    src={searchIcon(mainType)}
                    alt={mainType}
                    style={{ width: 30, height: 30 }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        marginLeft: 1,
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: "0.75rem",
                        fontFamily: "Rowdies, sans-serif",
                    }}
                >
                    {mainType}
                </Typography>
            </div>
            <CardMedia
                component="img"
                height="100"
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                sx={{
                    objectFit: "contain",
                    padding: 2,
                    marginTop: 6,
                    animation: `${bounce} 1.5s infinite`,
                }}
            />
            <CardContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        component={Link}
                        to={`/pokemon/${pokemon.name}`}
                        sx={{
                            color: "black",
                            "&:hover": {
                                color: "red",
                            },
                        }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: "Rowdies, sans-serif",
                            textAlign: "center",
                            flexGrow: 1,
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        {pokemon.name}
                    </Typography>
                    {!isFavoritePage &&
                        (isFavorite ? (
                            <IconButton
                                onClick={handleRemoveFavorite}
                                sx={{
                                    color: "red",
                                    "&:hover": {
                                        color: "red",
                                    },
                                }}
                            >
                                <FavoriteIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={handleAddFavorite}
                                sx={{
                                    color: "black",
                                    "&:hover": {
                                        color: "red",
                                    },
                                }}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        types: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
    }).isRequired,
    onFavoriteChange: PropTypes.func.isRequired,
    isFavoritePage: PropTypes.bool,
    removeFavorite: PropTypes.func,
};

export default memo(PokemonCard);
