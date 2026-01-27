import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { api } from '../services/api';
import { Dapp, Category } from '../types';
import { DappList } from '../components/DappList';
import { CategoryFilter } from '../components/CategoryFilter';
import { colors, spacing, typography } from '../constants/theme';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const HomeScreen = () => {
    const router = useRouter();
    const [dapps, setDapps] = useState<Dapp[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filtered dApps based on selection
    const filteredDapps = selectedCategory
        ? dapps.filter(d => d.category === selectedCategory)
        : dapps;

    const fetchData = async () => {
        try {
            // Fetch dApps and Categories in parallel
            const [dappsData, categoriesData] = await Promise.all([
                api.getDapps(),
                api.getCategories()
            ]);

            setDapps(dappsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to load dApps. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const handleDappPress = (dapp: Dapp) => {
        router.push({
            pathname: '/dapp/[id]',
            params: { id: dapp.id }
        });
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Explore the Base ecosystem</Text>

            <View style={styles.filterContainer}>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </View>

            <Text style={styles.sectionTitle}>
                {selectedCategory ? `${selectedCategory} dApps` : 'All dApps'}
            </Text>
        </View>
    );

    if (loading && !refreshing) {
        return <LoadingSpinner fullscreen message="Loading ecosystem..." />;
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <DappList
                dapps={filteredDapps}
                loading={loading}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onPressDapp={handleDappPress}
                ListHeaderComponent={renderHeader}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.sm,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.sm,
    },
    filterContainer: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h2,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.sm,
    },
});
