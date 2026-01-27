import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dapp } from '../types';

interface FavoritesContextType {
    favorites: Dapp[];
    addToFavorites: (dapp: Dapp) => Promise<void>;
    removeFromFavorites: (dappId: number) => Promise<void>;
    isFavorite: (dappId: number) => boolean;
    loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = '@baseapps_favorites_v1';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Dapp[]>([]);
    // Initialize loading to true so we can wait for initial load
    const [loading, setLoading] = useState(true);

    // Load favorites on mount
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                setFavorites(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Failed to load favorites', e);
        } finally {
            setLoading(false);
        }
    };

    const saveFavorites = async (newFavorites: Dapp[]) => {
        try {
            const jsonValue = JSON.stringify(newFavorites);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            setFavorites(newFavorites);
        } catch (e) {
            console.error('Failed to save favorites', e);
        }
    };

    const addToFavorites = async (dapp: Dapp) => {
        // Avoid duplicates
        if (!isFavorite(dapp.id)) {
            const newFavorites = [...favorites, dapp];
            await saveFavorites(newFavorites);
        }
    };

    const removeFromFavorites = async (dappId: number) => {
        const newFavorites = favorites.filter(d => d.id !== dappId);
        await saveFavorites(newFavorites);
    };

    const isFavorite = (dappId: number) => {
        return favorites.some(d => d.id === dappId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, loading }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
