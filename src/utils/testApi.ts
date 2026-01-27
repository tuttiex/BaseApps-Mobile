import { api } from '../services/api';

/**
 * Simple test utility to verify API connection
 * Run this by importing it in your main App file (e.g., App.tsx or app/index.tsx)
 * and calling TestApiConnection() in a useEffect.
 */
export const TestApiConnection = async () => {
    console.log('🧪 STARTING API CONNECTION TEST (ATTEMPT 2)...');

    try {
        // 1. Test fetching all dApps
        console.log('📡 Fetching all dApps...');
        const dapps = await api.getDapps();
        console.log(`✅ Success! Fetched ${Array.isArray(dapps) ? dapps.length : 'unknown number of'} dApps`);

        if (Array.isArray(dapps) && dapps.length > 0) {
            console.log('📝 Sample Dapp Data:', JSON.stringify(dapps[0], null, 2));
        } else {
            console.log('⚠️ No dApps returned or data structure is unexpected:', dapps);
        }

        // 2. Test fetching categories
        console.log('📡 Fetching categories...');
        const categories = await api.getCategories();
        console.log(`✅ Success! Fetched ${Array.isArray(categories) ? categories.length : 'unknown number of'} categories`);

        if (Array.isArray(categories) && categories.length > 0) {
            console.log('📝 Sample Category Data:', JSON.stringify(categories[0], null, 2));
        }

        console.log('🎉 API TEST COMPLETED SUCCESSFULLY');
        return true;
    } catch (error) {
        console.error('❌ API TEST FAILED');
        console.error(error);
        return false;
    }
};
