import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";
import Slider from "react-slick";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { memo } from "react";

const PokemonList = ({ pokemonList, onFavoriteChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: "0px",
    };

    if (isMobile) {
        return (
            <div
                style={{
                    width: "100%",
                    paddingTop: "40px",
                    paddingLeft: "20px",
                }}
            >
                <Slider {...settings}>
                    {pokemonList.map((pokemon) => (
                        <div
                            key={pokemon.name}
                            style={{
                                padding: "0 16px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <PokemonCard
                                pokemon={pokemon}
                                onFavoriteChange={onFavoriteChange}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            {pokemonList.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                    <PokemonCard
                        pokemon={pokemon}
                        onFavoriteChange={onFavoriteChange}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

PokemonList.propTypes = {
    pokemonList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
    onFavoriteChange: PropTypes.func.isRequired,
};

export default memo(PokemonList);
