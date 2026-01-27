import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';

export const SkeletonCard = () => {
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
        <View style={styles.card}>
            {/* Icon Skeleton */}
            <Animated.View style={[styles.icon, { opacity }]} />

            {/* Content Skeleton */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Animated.View style={[styles.title, { opacity }]} />
                    <Animated.View style={[styles.badge, { opacity }]} />
                </View>
                <Animated.View style={[styles.description, { opacity }]} />
                <Animated.View style={[styles.descriptionShort, { opacity }]} />
            </View>
        </View>
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
    icon: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.md,
        backgroundColor: colors.backgroundSecondary,
        marginRight: spacing.md,
    },
    content: {
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
    title: {
        width: '50%',
        height: 16,
        borderRadius: 4,
        backgroundColor: colors.backgroundSecondary,
    },
    badge: {
        width: 40,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.backgroundSecondary,
    },
    description: {
        width: '100%',
        height: 12,
        borderRadius: 4,
        backgroundColor: colors.backgroundSecondary,
        marginTop: 8,
    },
    descriptionShort: {
        width: '70%',
        height: 12,
        borderRadius: 4,
        backgroundColor: colors.backgroundSecondary,
        marginTop: 4,
    },
});
