import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../src/constants/theme';

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Favorites Screen (Coming Soon)</Text>
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
