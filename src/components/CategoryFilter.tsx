import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Category } from '../types';
import { colors, spacing, borderRadius } from '../constants/theme';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onSelectCategory
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* "All" Option */}
                <TouchableOpacity
                    style={[
                        styles.chip,
                        selectedCategory === null && styles.chipActive
                    ]}
                    onPress={() => onSelectCategory(null)}
                >
                    <Text style={[
                        styles.chipText,
                        selectedCategory === null && styles.chipTextActive
                    ]}>
                        All
                    </Text>
                </TouchableOpacity>

                {/* Dynamic Categories */}
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[
                            styles.chip,
                            selectedCategory === cat.name && styles.chipActive
                        ]}
                        onPress={() => onSelectCategory(cat.name)}
                    >
                        <Text style={[
                            styles.chipText,
                            selectedCategory === cat.name && styles.chipTextActive
                        ]}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
    },
    scrollContent: {
        paddingHorizontal: spacing.md,
        alignItems: 'center',
        gap: spacing.sm,
    },
    chip: {
        height: 32,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.round,
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    chipTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
