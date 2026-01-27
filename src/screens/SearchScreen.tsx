import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Dapp } from '../types';
import { DappList } from '../components/DappList';
import { SearchBar } from '../components/SearchBar';
import { colors, spacing, typography } from '../constants/theme';

export const SearchScreen = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Dapp[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Search for dApps, categories, or keywords');

    const handleSearch = async (text: string) => {
        setQuery(text);
        if (!text.trim()) {
            setResults([]);
            setMessage('Search for dApps, categories, or keywords');
            return;
        }

        setLoading(true);
        try {
            const data = await api.searchDapps(text);
            setResults(data);
            if (data.length === 0) {
                setMessage(`No results found for "${text}"`);
            }
        } catch (error) {
            console.error('Search error:', error);
            setMessage('Error performing search');
        } finally {
            setLoading(false);
        }
    };

    const handleDappPress = async (dapp: Dapp) => {
        try {
            const json = await AsyncStorage.getItem('@baseapps_recently_viewed_v1');
            let recent = json ? JSON.parse(json) : [];
            recent = [dapp, ...recent.filter((d: Dapp) => d.id !== dapp.id)].slice(0, 5);
            await AsyncStorage.setItem('@baseapps_recently_viewed_v1', JSON.stringify(recent));
        } catch (e) {
            console.error('Failed to save recently viewed', e);
        }

        router.push({
            pathname: '/dapp/[id]',
            params: { id: dapp.id }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Search</Text>
                <SearchBar onSearch={handleSearch} placeholder="Search BaseApps..." />
            </View>

            {query.length === 0 || (results.length === 0 && !loading) ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            ) : (
                <DappList
                    dapps={results}
                    loading={loading}
                    onPressDapp={handleDappPress}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.md,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    messageText: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
