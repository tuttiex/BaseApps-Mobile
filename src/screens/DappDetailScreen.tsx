import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Linking, Share, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, Button, Surface, IconButton } from 'react-native-paper';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { Dapp } from '../types';
import { SkeletonDetail } from '../components/SkeletonDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

import { useFavorites } from '../context/FavoritesContext';

export const DappDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [dapp, setDapp] = useState<Dapp | null>(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

    const favorited = dapp ? isFavorite(dapp.id) : false;

    useEffect(() => {
        const fetchDapp = async () => {
            if (!id) return;
            try {
                setLoading(true);
                // id comes as string from router, convert to number if needed or ensure API handles it
                // Our Types say id is number, so let's parse it
                const dappId = parseInt(id, 10);
                const data = await api.getDappById(dappId);
                setDapp(data);
            } catch (error) {
                console.error('Error fetching dapp details:', error);
                Alert.alert('Error', 'Failed to load dApp details');
            } finally {
                setLoading(false);
            }
        };

        fetchDapp();
    }, [id]);

    const handleOpenWebsite = () => {
        const urlToOpen = dapp?.url || dapp?.website_url;
        if (urlToOpen) {
            Linking.openURL(urlToOpen);
        } else {
            Alert.alert("Error", "No URL available for this dApp");
        }
    };

    const handleShare = async () => {
        if (!dapp) return;
        try {
            await Share.share({
                message: `Check out ${dapp.name} on BaseApps! ${dapp.website_url}`,
                url: dapp.website_url, // iOS only
                title: dapp.name // Android only
            });
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = async () => {
        if (!dapp) return;
        if (favorited) {
            await removeFromFavorites(dapp.id);
        } else {
            await addToFavorites(dapp);
        }
    };

    if (loading) {
        return <SkeletonDetail />;
    }

    if (!dapp) {
        return (
            <View style={styles.errorContainer}>
                <Text>dApp not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: colors.text,
                    headerRight: () => (
                        <IconButton
                            icon={favorited ? "heart" : "heart-outline"}
                            iconColor={favorited ? colors.error : colors.text}
                            onPress={toggleFavorite}
                        />
                    )
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Banner / Header Image Area could go here if available */}

                <View style={styles.header}>
                    <Image
                        source={{ uri: dapp.logo_url || dapp.logo }}
                        style={styles.logo}
                        contentFit="cover"
                        transition={200}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.title}>{dapp.name}</Text>
                        <View style={styles.badgeRow}>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{dapp.category}</Text>
                            </View>
                            {dapp.status === 'approved' && (
                                <View style={[styles.categoryBadge, styles.verifiedBadge]}>
                                    <Ionicons name="checkmark-circle" size={12} color="white" style={{ marginRight: 4 }} />
                                    <Text style={styles.verifiedText}>Verified</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <Surface style={styles.actionCard} elevation={2}>
                    <Text style={styles.description}>{dapp.description}</Text>

                    <View style={styles.buttonRow}>
                        <Button
                            mode="contained"
                            onPress={handleOpenWebsite}
                            style={styles.openButton}
                            buttonColor={colors.primary}
                            icon="open-in-new"
                        >
                            Open dApp
                        </Button>

                        <IconButton
                            icon="share-variant"
                            mode="outlined"
                            iconColor={colors.text}
                            style={styles.iconButton}
                            onPress={handleShare}
                        />
                    </View>
                </Surface>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Chain</Text>
                        <Text style={styles.infoValue}>{dapp.chain}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status</Text>
                        <Text style={styles.infoValue}>{dapp.status}</Text>
                    </View>
                    {dapp.created_at && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Added</Text>
                            <Text style={styles.infoValue}>
                                {new Date(dapp.created_at).toLocaleDateString()}
                            </Text>
                        </View>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingTop: 100, // Space for transparent header
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    headerText: {
        flex: 1,
        marginLeft: spacing.md,
    },
    title: {
        ...typography.h1,
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    badgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryBadge: {
        backgroundColor: colors.backgroundSecondary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: borderRadius.round,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    categoryText: {
        color: colors.primary,
        fontWeight: '600' as '600',
        fontSize: 12,
    },
    verifiedBadge: {
        backgroundColor: colors.success,
        borderColor: colors.success,
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedText: {
        color: 'white',
        fontWeight: '600' as '600',
        fontSize: 12,
    },
    actionCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    openButton: {
        flex: 1,
        borderRadius: borderRadius.md,
    },
    iconButton: {
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        margin: 0,
    },
    infoSection: {
        marginTop: spacing.md,
    },
    sectionTitle: {
        ...typography.h2,
        fontSize: 18,
        marginBottom: spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    infoLabel: {
        ...typography.body,
        color: colors.textSecondary,
    },
    infoValue: {
        ...typography.body,
        fontWeight: '500' as '500',
    },
});
