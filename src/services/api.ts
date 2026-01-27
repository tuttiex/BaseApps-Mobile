import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Dapp, Category, DappsResponse } from '../types';

const BASE_URL = 'https://baseapps-production.up.railway.app';
const CACHED_DAPPS_KEY = '@baseapps_cached_dapps_v1';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const api = {
    /**
     * Fetch all dApps with offline support
     */
    getDapps: async (): Promise<Dapp[]> => {
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected) {
            try {
                const response = await apiClient.get<DappsResponse>('/api/dapps');
                const dapps = response.data.dapps;
                // Cache the fresh data
                await AsyncStorage.setItem(CACHED_DAPPS_KEY, JSON.stringify(dapps));
                return dapps;
            } catch (error) {
                console.error('Error fetching dapps online:', error);
                // Fallback to cache if APi fails even if online
                const cached = await AsyncStorage.getItem(CACHED_DAPPS_KEY);
                if (cached) {
                    return JSON.parse(cached);
                }
                throw error;
            }
        } else {
            // Offline: load from cache
            console.log('OFFLINE MODE: Loading dApps from cache');
            const cached = await AsyncStorage.getItem(CACHED_DAPPS_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
            throw new Error('No internet connection and no cached data available.');
        }
    },

    /**
     * Get single dApp details by ID (Offline supported via full list cache)
     */
    getDappById: async (id: number): Promise<Dapp> => {
        try {
            // Reuse getDapps which handles offline/caching
            const dapps = await api.getDapps();
            const dapp = dapps.find(d => d.id === id);

            if (!dapp) {
                throw new Error(`Dapp with ID ${id} not found`);
            }

            return dapp;
        } catch (error) {
            console.error(`Error fetching dapp ${id}:`, error);
            throw error;
        }
    },

    /**
     * Fetch all categories (Offline supported via full list cache)
     */
    getCategories: async (): Promise<Category[]> => {
        try {
            const dapps = await api.getDapps();
            const uniqueCategories = Array.from(new Set(dapps.map(d => d.category))).filter(Boolean).sort();

            return uniqueCategories.map(cat => ({
                id: cat.toLowerCase().replace(/\s+/g, '-'),
                name: cat,
                slug: cat.toLowerCase().replace(/\s+/g, '-')
            }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * Search dApps with query string (Client-side fallback for offline)
     */
    searchDapps: async (query: string): Promise<Dapp[]> => {
        const netInfo = await NetInfo.fetch();

        if (netInfo.isConnected) {
            try {
                const response = await apiClient.get<DappsResponse>(`/api/dapps/search?q=${encodeURIComponent(query)}`);
                return response.data.dapps || (response.data as any);
            } catch {
                // If API search fails, fall back to client-side filtering of cached data
                console.warn('Online search failed, falling back to local search');
            }
        }

        // Offline or fallback search
        const dapps = await api.getDapps();
        const lowerQuery = query.toLowerCase();
        return dapps.filter(d =>
            d.name.toLowerCase().includes(lowerQuery) ||
            (d.description && d.description.toLowerCase().includes(lowerQuery)) ||
            (d.category && d.category.toLowerCase().includes(lowerQuery))
        );
    },

    /**
     * Filter dApps by category (Offline supported)
     */
    getDappsByCategory: async (categoryName: string): Promise<Dapp[]> => {
        try {
            const dapps = await api.getDapps();
            return dapps.filter(d => d.category === categoryName);
        } catch (error) {
            console.error(`Error fetching dapps for category ${categoryName}:`, error);
            throw error;
        }
    },

    /**
     * Get featured dApps (Offline supported via client-side subset)
     */
    getFeaturedDapps: async (): Promise<Dapp[]> => {
        try {
            // If offline, just return a random subset or the first few as "featured"
            const netInfo = await NetInfo.fetch();
            if (netInfo.isConnected) {
                try {
                    const response = await apiClient.get<DappsResponse>('/api/dapps/featured');
                    return response.data.dapps || (response.data as any);
                } catch { console.warn('Online featured fetch failed'); }
            }

            // Fallback
            const dapps = await api.getDapps();
            return dapps.slice(0, 5); // Return first 5 as mock featured
        } catch (error) {
            console.error('Error fetching featured dapps:', error);
            throw error;
        }
    }
};

export default api;
