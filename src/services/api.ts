import axios from 'axios';
import { Dapp, Category, SearchParams, DappsResponse } from '../types';

const BASE_URL = 'https://baseapps-production.up.railway.app';

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
     * Fetch all dApps
     */
    getDapps: async (): Promise<Dapp[]> => {
        try {
            const response = await apiClient.get<DappsResponse>('/api/dapps');
            return response.data.dapps;
        } catch (error) {
            console.error('Error fetching dapps:', error);
            throw error;
        }
    },

    /**
     * Get single dApp details by ID
     */
    getDappById: async (id: number): Promise<Dapp> => {
        try {
            const response = await apiClient.get<Dapp>(`/api/dapps/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching dapp ${id}:`, error);
            throw error;
        }
    },

    /**
     * Fetch all categories
     * Note: The direct endpoint /api/categories failed, so we extract unique categories from the dApps list
     */
    getCategories: async (): Promise<Category[]> => {
        try {
            const response = await apiClient.get<DappsResponse>('/api/dapps');
            const dapps = response.data.dapps;

            // Extract unique categories
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
     * Search dApps with query string
     */
    searchDapps: async (query: string): Promise<Dapp[]> => {
        try {
            const response = await apiClient.get<DappsResponse>(`/api/dapps/search?q=${encodeURIComponent(query)}`);
            // Typically search results also follow the { count, dapps } structure
            return response.data.dapps || (response.data as any);
        } catch (error) {
            console.error(`Error searching dapps for "${query}":`, error);
            throw error;
        }
    },

    /**
     * Filter dApps by category
     */
    getDappsByCategory: async (categoryName: string): Promise<Dapp[]> => {
        try {
            // Note: The API likely filters on the client side if this endpoint is missing or behaves differently.
            // But if there IS an endpoint:
            // const response = await apiClient.get<DappsResponse>(`/api/dapps/category/${encodeURIComponent(categoryName)}`);
            // return response.data.dapps;

            // Safer approach given we know /api/dapps works:
            const response = await apiClient.get<DappsResponse>('/api/dapps');
            return response.data.dapps.filter(d => d.category === categoryName);
        } catch (error) {
            console.error(`Error fetching dapps for category ${categoryName}:`, error);
            throw error;
        }
    },

    /**
     * Get featured dApps
     */
    getFeaturedDapps: async (): Promise<Dapp[]> => {
        try {
            const response = await apiClient.get<DappsResponse>('/api/dapps/featured');
            return response.data.dapps || (response.data as any);
        } catch (error) {
            console.error('Error fetching featured dapps:', error);
            throw error;
        }
    }
};

export default api;
