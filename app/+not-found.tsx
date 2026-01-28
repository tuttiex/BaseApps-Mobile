import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, typography } from '@/src/constants/theme';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>This screen doesn't exist.</Text>
                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        ...typography.h2,
        marginBottom: spacing.md,
    },
    link: {
        marginTop: spacing.md,
        paddingVertical: spacing.md,
    },
    linkText: {
        ...typography.body,
        color: colors.primary,
    },
});
