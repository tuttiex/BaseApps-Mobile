import React from 'react';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { DappCard } from './DappCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Dapp } from '../types';
import { colors, spacing } from '../constants/theme';

interface DappListProps {
    dapps: Dapp[];
    loading: boolean;
    onRefresh?: () => void;
    refreshing?: boolean;
    onPressDapp: (dapp: Dapp) => void;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export const DappList: React.FC<DappListProps> = ({
    dapps,
    loading,
    onRefresh,
    refreshing = false,
    onPressDapp,
    ListHeaderComponent
}) => {

    if (loading && dapps.length === 0) {
        return <LoadingSpinner fullscreen message="Loading ecosystem..." />;
    }

    return (
        <FlatList
            data={dapps}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <DappCard dapp={item} onPress={onPressDapp} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={
                !loading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No dApps found matching your criteria.</Text>
                    </View>
                ) : null
            }
            refreshControl={
                onRefresh ? (
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary}
                        colors={[colors.primary]}
                    />
                ) : undefined
            }
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: spacing.md,
        paddingBottom: 100, // Safe area for tab bar
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
    },
});
