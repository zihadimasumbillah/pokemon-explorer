import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Slider from "react-slick";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Favorites({ onFavoriteChange }) {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("favorites");
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (err) {
            setError("Failed to load favorites");
            console.error("Error loading favorites:", err);
        }
    }, []);

    const removeFavorite = (pokemonName) => {
        try {
            const updatedFavorites = favorites.filter(
                (pokemon) => pokemon.name !== pokemonName
            );
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            onFavoriteChange(updatedFavorites);
        } catch (err) {
            setError("Failed to remove from favorites");
            console.error("Error removing from favorites:", err);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
    };

    return (
        <div className="favorites-container">
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    "&:hover": {
                        backgroundColor: "#e0e0e0",
                    },
                    [theme.breakpoints.down("sm")]: {
                        width: 30,
                        height: 30,
                        minWidth: 0,
                        padding: 0,
                    },
                }}
            >
                <BiArrowBack size={20} />
            </Button>
            <h2 style={{ textAlign: "center" }}>My Favorite Pokemon</h2>
            {favorites.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                    No favorite Pokemon added yet!
                </p>
            ) : isMobile ? (
                <div style={{ width: "100%", paddingTop: "40px" }}>
                    <Slider {...settings}>
                        {favorites.map((pokemon) => (
                            <div
                                key={pokemon.name}
                                style={{
                                    padding: "0 16px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <PokemonCard
                                    pokemon={pokemon}
                                    onFavoriteChange={setFavorites}
                                    isFavoritePage={true}
                                    removeFavorite={removeFavorite}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div
                    className="pokemon-list"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {favorites.map((pokemon) => (
                        <div key={pokemon.name} style={{ width: "100%" }}>
                            <PokemonCard
                                pokemon={pokemon}
                                onFavoriteChange={setFavorites}
                                isFavoritePage={true}
                                removeFavorite={removeFavorite}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Favorites.propTypes = {
    onFavoriteChange: PropTypes.func.isRequired,
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
};
