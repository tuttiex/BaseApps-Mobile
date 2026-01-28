import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Dapp, Category } from '../types';
import { DappList } from '../components/DappList';
import { CategoryFilter } from '../components/CategoryFilter';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { AppKitButton, ConnectButton } from '@/src/config/web3';
import { useAccount } from 'wagmi';

const RECENTLY_VIEWED_KEY = '@baseapps_recently_viewed_v1';
type SortOption = 'new' | 'name' | 'expert';

export const HomeScreen = () => {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const [dapps, setDapps] = useState<Dapp[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('new');
    const [recentlyViewed, setRecentlyViewed] = useState<Dapp[]>([]);

    // Process dApps: Filter -> Sort
    const processedDapps = useMemo(() => {
        let result = [...dapps];

        // Filter
        if (selectedCategory) {
            result = result.filter(d => d.category === selectedCategory);
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'new':
                    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'expert':
                    return (a.status === 'approved' ? -1 : 1);
                default:
                    return 0;
            }
        });

        return result;
    }, [dapps, selectedCategory, sortBy]);

    const fetchData = async () => {
        try {
            const [dappsData, categoriesData] = await Promise.all([
                api.getDapps(),
                api.getCategories()
            ]);

            setDapps(dappsData);
            setCategories(categoriesData);

            const recentJson = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
            if (recentJson) {
                setRecentlyViewed(JSON.parse(recentJson));
            }
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

    const handleDappPress = async (dapp: Dapp) => {
        const newRecent = [dapp, ...recentlyViewed.filter(d => d.id !== dapp.id)].slice(0, 5);
        setRecentlyViewed(newRecent);
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newRecent));

        router.push({
            pathname: '/dapp/[id]',
            params: { id: dapp.id }
        });
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.title}>Discover</Text>
                    <Text style={styles.subtitle}>Explore the Base ecosystem</Text>
                </View>
                <ConnectButton label="WalletConnect" loadingLabel="Connecting..." />
            </View>

            {recentlyViewed.length > 0 && !selectedCategory && (
                <View style={styles.recentSection}>
                    <Text style={styles.sectionTitle}>Recently Viewed</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentList}>
                        {recentlyViewed.map(item => (
                            <TouchableOpacity key={item.id} style={styles.recentCard} onPress={() => handleDappPress(item)}>
                                <Text style={styles.recentTitle} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.recentCategory}>{item.category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <View style={styles.filterContainer}>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </View>

            <View style={styles.sortContainer}>
                {(['new', 'name', 'expert'] as SortOption[]).map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
                        onPress={() => setSortBy(option)}
                    >
                        <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>
                            {option === 'new' ? 'Newest' : option === 'name' ? 'A-Z' : 'Popular'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>
                {selectedCategory ? `${selectedCategory} dApps` : 'All dApps'}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <DappList
                dapps={processedDapps}
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
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.sm,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.xs,
        fontSize: 24,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    filterContainer: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h2,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.sm,
    },
    recentSection: {
        marginBottom: spacing.lg,
    },
    recentList: {
        paddingHorizontal: spacing.sm,
        gap: spacing.sm,
    },
    recentCard: {
        width: 120,
        height: 80,
        padding: spacing.sm,
        backgroundColor: colors.card,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
    },
    recentTitle: {
        ...typography.body,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    recentCategory: {
        ...typography.caption,
        color: colors.primary,
    },
    sortContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    sortButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: borderRadius.round,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    sortButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    sortText: {
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    sortTextActive: {
        color: 'white',
    },
});
