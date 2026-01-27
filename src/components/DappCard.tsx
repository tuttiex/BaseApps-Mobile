import React, { useRef } from 'react';
import { StyleSheet, View, Pressable, Animated } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Image } from 'expo-image';
import { Dapp } from '../types';
import { colors, spacing, borderRadius, animations } from '../constants/theme';

interface DappCardProps {
    dapp: Dapp;
    onPress: (dapp: Dapp) => void;
}

export const DappCard: React.FC<DappCardProps> = ({ dapp, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: animations.press.scale,
            useNativeDriver: true,
            speed: 50,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
        }).start();
    };

    return (
        <Pressable
            onPress={() => onPress(dapp)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{ marginBottom: spacing.sm }}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                <Surface style={styles.card} elevation={1}>
                    {/* Dapp Icon */}
                    <View style={styles.iconContainer}>
                        <Image
                            source={{ uri: dapp.logo_url || dapp.logo }}
                            style={styles.logo}
                            contentFit="cover"
                            transition={200}
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
            </Animated.View>
        </Pressable>
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
