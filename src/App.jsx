import { useEffect, useState, useCallback } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import HomePage from "./pages/HomePage";
import PokemonDetails from "./pages/PokemonDetails";
import Loading from "./components/Loading";

export default function App() {
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        setFavoriteCount(storedFavorites.length);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const handleFavoriteChange = useCallback((favorites) => {
        setFavoriteCount(favorites.length);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Router>
            <Navbar favoriteCount={favoriteCount} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage onFavoriteChange={handleFavoriteChange} />
                    }
                />
                <Route path="/pokemon/:name" element={<PokemonDetails />} />
                <Route
                    path="/favorites"
                    element={
                        <Favorites onFavoriteChange={handleFavoriteChange} />
                    }
                />
                <Route
                    path="/type/:type"
                    element={
                        <HomePage onFavoriteChange={handleFavoriteChange} />
                    }
                />
            </Routes>
        </Router>
    );
}
