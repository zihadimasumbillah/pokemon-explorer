import {
    Box,
    Typography,
    LinearProgress,
    Card,
    CardMedia,
    Divider,
    Button,
} from "@mui/material";
import { styled, keyframes, useTheme } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../api.js";
import pokeball from "../assets/pokeball.png";
import { searchIcon } from "../utils/icons";
import {
    GiHealthNormal,
    GiBroadsword,
    GiShield,
    GiMagicShield,
    GiRunningShoe,
    GiStarFormation,
    GiLightningTrio,
} from "react-icons/gi";
import { BiStats, BiArrowBack } from "react-icons/bi";

const DetailContainer = styled(Card)(({ theme }) => ({
    maxWidth: 1000,
    margin: "40px auto",
    padding: theme.spacing(4),
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
}));

const StatBar = styled(LinearProgress)(({ theme, value }) => ({
    height: 24,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    position: "relative",
    "& .MuiLinearProgress-bar": {
        backgroundColor:
            value > 100
                ? theme.palette.success.light
                : theme.palette.primary.light,
    },
    "& .MuiLinearProgress-bar::after": {
        content: `"${value}"`,
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#fff",
        fontWeight: "bold",
    },
    [theme.breakpoints.down("sm")]: {
        height: 12,
    },
}));

const InfoContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        padding: theme.spacing(1),
        marginBottom: 0,
    },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
    flex: 1.5,
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: theme.spacing(2),
        marginTop: 0,
    },
}));

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-15px);
    }
`;

const typeColors = {
    bug: "#D3E4CD",
    dark: "#A9A9A9",
    dragon: "#C3B1E1",
    electric: "#FFFACD",
    fairy: "#FADADD",
    fighting: "#E9967A",
    fire: "#FFDAB9",
    flying: "#D3D3D3",
    ghost: "#D8BFD8",
    grass: "#98FB98",
    ground: "#F4A460",
    ice: "#AFEEEE",
    normal: "#F5F5F5",
    poison: "#DA70D6",
    psychic: "#FFB6C1",
    rock: "#D2B48C",
    steel: "#B0C4DE",
    water: "#ADD8E6",
};

const statColors = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
};

const statIcons = {
    hp: <GiHealthNormal size={24} />,
    attack: <GiBroadsword size={24} />,
    defense: <GiShield size={24} />,
    "special-attack": <GiLightningTrio size={24} />,
    "special-defense": <GiMagicShield size={24} />,
    speed: <GiRunningShoe size={24} />,
};

const PokemonDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        fetchPokemonDetails(name).then((data) => setPokemon(data));
    }, [name]);

    if (!pokemon) return <div>Loading...</div>;

    const mainType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[mainType];

    return (
        <>
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
                        width: 40,
                        height: 40,
                        minWidth: 0,
                        padding: 0,
                    },
                }}
            >
                <BiArrowBack size={24} />
            </Button>
            <DetailContainer sx={{ backgroundColor: backgroundColor }}>
                <InfoContainer>
                    <Box
                        sx={{
                            position: "relative",
                            textAlign: "center",
                            padding: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                display: "flex",
                                alignItems: "center",
                                padding: 4,
                                borderRadius: "50%",
                                gap: 1,
                                [theme.breakpoints.down("sm")]: {
                                    padding: 2,
                                    top: 4,
                                    left: 4,
                                    gap: 1,
                                },
                            }}
                        >
                            <img
                                src={pokeball}
                                alt="Pokeball"
                                style={{ width: 30, height: 30 }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    marginLeft: 1,
                                    fontWeight: "bold",
                                    color: "#000",
                                    fontSize: "1rem",
                                    [theme.breakpoints.down("sm")]: {
                                        fontSize: "0.75rem",
                                    },
                                }}
                            >
                                #{pokemon.id}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                display: "flex",
                                alignItems: "center",
                                padding: 4,
                                borderRadius: "50%",
                                cursor: "pointer",
                                gap: 1,
                                [theme.breakpoints.down("sm")]: {
                                    padding: 2,
                                    top: 4,
                                    right: 4,
                                },
                            }}
                        >
                            <img
                                src={searchIcon(mainType)}
                                alt={mainType}
                                style={{
                                    width: 30,
                                    height: 30,
                                    [theme.breakpoints.down("sm")]: {
                                        width: 20,
                                        height: 20,
                                    },
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    marginLeft: 1,
                                    fontWeight: "bold",
                                    color: "#000",
                                    fontSize: "0.75rem",
                                    fontFamily: "Rowdies, sans-serif",
                                    [theme.breakpoints.down("sm")]: {
                                        marginLeft: 0.5,
                                    },
                                }}
                            >
                                {mainType}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 4,
                                [theme.breakpoints.down("sm")]: {
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    textAlign: "center",
                                    gap: 2,
                                },
                                [theme.breakpoints.up("md")]: {
                                    gap: 2,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    [theme.breakpoints.down("sm")]: {
                                        marginRight: 2,
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    align="center"
                                    gutterBottom
                                    sx={{
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: "0.75rem",
                                        },
                                    }}
                                >
                                    Height
                                </Typography>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color="textSecondary"
                                    sx={{
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: "0.75rem",
                                        },
                                    }}
                                >
                                    {pokemon.height}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 200,
                                    height: 200,
                                    borderRadius: "50%",
                                    backgroundColor: "#f0f0f0",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "36px auto",
                                    [theme.breakpoints.down("sm")]: {
                                        width: 140,
                                        height: 140,
                                        margin: "18px auto",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={
                                        pokemon.sprites.other[
                                            "official-artwork"
                                        ].front_default
                                    }
                                    alt={pokemon.name}
                                    sx={{
                                        width: 180,
                                        height: 180,
                                        animation: `${bounce} 1.5s infinite`,
                                        [theme.breakpoints.down("sm")]: {
                                            width: 120,
                                            height: 120,
                                        },
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    [theme.breakpoints.down("sm")]: {
                                        marginLeft: 2,
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    align="center"
                                    gutterBottom
                                    sx={{
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: "0.75rem",
                                        },
                                    }}
                                >
                                    Weight
                                </Typography>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color="textSecondary"
                                    sx={{
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: "0.75rem",
                                        },
                                    }}
                                >
                                    {pokemon.weight}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: "1rem",
                                },
                            }}
                        >
                            {pokemon.name}
                        </Typography>
                    </Box>
                </InfoContainer>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}
                />
                <StatsContainer
                    sx={{
                        [theme.breakpoints.down("sm")]: {},
                    }}
                >
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "0.75rem",
                            },
                        }}
                    >
                        <GiStarFormation
                            style={{
                                marginRight: 8,
                                [theme.breakpoints.down("sm")]: {
                                    marginRight: 4,
                                    fontSize: "0.75rem",
                                },
                            }}
                        />{" "}
                        Abilities
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                        sx={{
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "0.75rem",
                            },
                        }}
                    >
                        {pokemon.abilities
                            .map((a) => a.ability.name)
                            .join(", ")}
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{
                            marginTop: 4,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "0.75rem",
                                marginTop: 2,
                            },
                        }}
                    >
                        <BiStats
                            style={{
                                marginRight: 8,
                                [theme.breakpoints.down("sm")]: {
                                    marginRight: 4,
                                    fontSize: "0.75rem",
                                },
                            }}
                        />{" "}
                        Stats
                    </Typography>
                    {pokemon.stats.map((stat) => (
                        <Box
                            key={stat.stat.name}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 2,
                                [theme.breakpoints.down("sm")]: {
                                    marginBottom: 1,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                {statIcons[stat.stat.name]}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginLeft: 1,
                                        textTransform: "capitalize",
                                        whiteSpace: "nowrap",
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: "0.75rem",
                                        },
                                    }}
                                >
                                    {stat.stat.name}
                                </Typography>
                            </Box>
                            <StatBar
                                variant="determinate"
                                value={Math.min(stat.base_stat, 100)}
                                sx={{
                                    flex: 3,
                                    margin: "0 8px",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor:
                                            statColors[stat.stat.name],
                                    },
                                    [theme.breakpoints.down("sm")]: {
                                        height: 12,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </StatsContainer>
            </DetailContainer>
        </>
    );
};

export default PokemonDetails;
