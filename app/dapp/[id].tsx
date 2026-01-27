import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/src/constants/theme';

export default function DappDetailScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Dapp Details' }} />
            <Text style={styles.text}>Details for Dapp ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.text,
    },
});
