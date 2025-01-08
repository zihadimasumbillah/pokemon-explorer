import "@fontsource/jersey-15";
import "@fontsource/rubik-vinyl";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import pokemonLogo from "../assets/pokemon_logo.png";

export default function NavBar({ favoriteCount }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "white",
                boxShadow: "none",
                marginBottom: 2,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title="Home">
                    <IconButton
                        onClick={handleLogoClick}
                        sx={{
                            color: "black",
                            "&:hover": {
                                color: "gray",
                            },
                        }}
                    >
                        <img
                            src={pokemonLogo}
                            alt="Pokemon Logo"
                            style={{ height: "60px" }}
                        />
                    </IconButton>
                </Tooltip>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Tooltip title="Favorites">
                        <IconButton
                            component={Link}
                            to="/favorites"
                            sx={{
                                color: "red",
                                "&:hover": {
                                    color: "darkred",
                                },
                            }}
                        >
                            <Badge badgeContent={favoriteCount} color="error">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {
    favoriteCount: PropTypes.number.isRequired,
};
