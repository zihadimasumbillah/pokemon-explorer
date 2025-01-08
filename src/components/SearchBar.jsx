import FilterListIcon from "@mui/icons-material/FilterList";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    setSortOption,
    sortOption,
    setTypeFilter,
    typeFilter,
    typeNames,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTypeChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
                marginTop: isMobile ? 36 : 0,
            }}
        >
            <div style={{ maxWidth: "800px", width: "100%" }}>
                <TextField
                    label="Search Pokémon (eg : Pikachu or 25)"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClick}
                                    sx={{
                                        "& .MuiSvgIcon-root": {
                                            fontSize: {
                                                xs: "1.5rem",
                                                sm: "2rem",
                                            },
                                        },
                                        "&:hover": {
                                            color: "yellow",
                                        },
                                    }}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        marginRight: 2,
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "yellow",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                                color: "Gray",
                            },
                            fontSize: {
                                xs: "0.85rem",
                                sm: "1rem",
                            },
                        },
                    }}
                />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={typeFilter}
                                onChange={handleTypeChange}
                                label="Type"
                                sx={{ minWidth: 120 }}
                            >
                                {typeNames.map((typeName) => (
                                    <MenuItem key={typeName} value={typeName}>
                                        {typeName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <MenuItem>
                        <FormControl fullWidth>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortOption}
                                onChange={handleSortChange}
                                label="Sort By"
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="highest-to-lowest">
                                    Base Stats
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    setSortOption: PropTypes.func.isRequired,
    sortOption: PropTypes.string.isRequired,
    setTypeFilter: PropTypes.func.isRequired,
    typeFilter: PropTypes.string.isRequired,
    typeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBar;
