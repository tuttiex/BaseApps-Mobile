import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';

export const SkeletonDetail = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header Skeleton */}
            <View style={styles.header}>
                <Animated.View style={[styles.icon, { opacity }]} />
                <View style={styles.headerText}>
                    <Animated.View style={[styles.title, { opacity }]} />
                    <Animated.View style={[styles.badge, { opacity }]} />
                </View>
            </View>

            {/* Action Card Skeleton */}
            <View style={styles.card}>
                <Animated.View style={[styles.description, { opacity }]} />
                <Animated.View style={[styles.description, { width: '80%', marginTop: 8 }, { opacity }]} />
                <View style={styles.buttonRow}>
                    <Animated.View style={[styles.button, { opacity }]} />
                    <Animated.View style={[styles.iconButton, { opacity }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        paddingTop: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.backgroundSecondary,
    },
    headerText: {
        flex: 1,
        marginLeft: spacing.md,
    },
    title: {
        width: '60%',
        height: 24,
        borderRadius: 6,
        backgroundColor: colors.backgroundSecondary,
        marginBottom: 12,
    },
    badge: {
        width: 80,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.backgroundSecondary,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    description: {
        width: '100%',
        height: 16,
        borderRadius: 4,
        backgroundColor: colors.backgroundSecondary,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 24,
        gap: spacing.sm,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.backgroundSecondary,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.backgroundSecondary,
    },
});
