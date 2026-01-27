import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Dapp } from '../types';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface DappCardProps {
    dapp: Dapp;
    onPress: (dapp: Dapp) => void;
}

export const DappCard: React.FC<DappCardProps> = ({ dapp, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(dapp)}
            activeOpacity={0.7}
        >
            <Surface style={styles.card} elevation={1}>
                {/* Dapp Icon */}
                <View style={styles.iconContainer}>
                    <Image
                        source={{ uri: dapp.logo_url || dapp.logo }}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.name} numberOfLines={1}>{dapp.name}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{dapp.category}</Text>
                        </View>
                    </View>

                    <Text style={styles.description} numberOfLines={2}>
                        {dapp.description}
                    </Text>
                </View>
            </Surface>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: spacing.md,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.md,
        backgroundColor: colors.backgroundSecondary,
    },
    contentContainer: {
        flex: 1,
        height: 60,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        flex: 1,
        marginRight: 8,
    },
    badge: {
        backgroundColor: colors.primary + '20', // 20% opacity
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 18,
    },
});
